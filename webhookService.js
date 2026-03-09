const axios = require('axios');

let webhooks = [];

/**
 * Register webhook
 */
function registerWebhook(url) {
    webhooks.push(url);
}

/**
 * Send webhook with retry
 */
async function sendWebhook(event, data) {
    for (const url of webhooks) {
        let attempts = 0;

        while (attempts < 3) {
            try {
                await axios.post(url, { event, data });
                break;
            } catch (err) {
                attempts++;

                if (attempts >= 3) {
                    console.log(`Webhook failed for ${url}`);
                }
            }
        }
    }
}

module.exports = {
    registerWebhook,
    sendWebhook
};