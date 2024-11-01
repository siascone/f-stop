class User < ApplicationRecord
    has_secure_password

    validates :username,
        uniqueness: true,
        length: { in: 3..40 },
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email,
        uniqueness: true, 
        length: { in: 3..100 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, 
        presence: true, 
        uniqueness: true
    validates :password, 
        length: { in: 6..40 }, 
        allow_nil: true

    before_validation :ensure_session_token

    def self.find_by_credentials(credential, password)
        column = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username

        user = User.find_by(column => credential)
        user&.authenticate(password)

    end

    def reset_session_token!
        self.session_token = ensure_session_token()
        self.save!
        self.session_token
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.base64
            return token if !User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        if !self.session_token 
            self.session_token = generate_unique_session_token()
        end
    end
end
