import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test',

  port: process.env.PORT_NP || 4000,
  dbUrlNP: process.env.DATABASE_URL,
  dbUrlT: process.env.DATABASE_TEST_URL,

  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  emailFrom: process.env.EMAIL_FROM,

  urlFront: process.env.URL_FRONT,
  url: process.env.URL,
  urlNoProtocol: process.env.URL_NO_PROTOCOL,

  jwtSecret: process.env.JWT_SECRET,
  jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,

  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS,
  awsRegion: process.env.AWS_REGION,
  awsBucket: process.env.AWS_BUCKET_NAME,
  awsDownloadLinkExpiration: process.env.AWS_DOWNLOAD_LINK_EXPIRATION,

  stripeSecretType: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  stripeRefreshUrl: process.env.STRIPE_REFRESH_URL,
  stripeReturnUrl: process.env.STRIPE_RETURN_URL,

  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,

  azureAdClientId: process.env.AZURE_AD_CLIENT_ID,
  azureAdTenantId: process.env.AZURE_AD_TENANT_ID,
  azureAdClientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  azureAdCallback: process.env.AZURE_AD_CALLBACK_URI,
  azureAdFailureRedirect: process.env.AZURE_AD_FAILURE_REDIRECT,
  microsoftAuthorizationUrl: process.env.MICROSOFT_AUTHORIZATION_URL,
  microsoftTokenUrl: process.env.MICROSOFT_TOKEN_URL,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallback: process.env.GOOGLE_CALLBACK,
  googlefailureRedirect: process.env.GOOGLE_FAILURE_REDIRECT,
  googlesuccessRedirect: process.env.GOOGLE_SUCCESS_REDIRECT,

};

module.exports = { config };