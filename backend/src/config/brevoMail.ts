import "dotenv/config";
import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.API_KEY_SERVICE_MAIL!
);

export { apiInstance, brevo };
