const axios = require('axios');

module.exports = async function (context, req) {
    context.log('mensajeChatVirtual trigger recibido.');

    const { mensaje } = req.body || {};
    if (!mensaje) {
        context.res = {
            status: 400,
            body: { error: "No se recibió 'mensaje' en el body." }
        };
        return;
    }

    try {
        const webhookUrl = "https://hook.us2.make.com/d468x3vicvqhh66zfhhyqpj6f1l1m58k";
        const apiKey = "0210f776-664b-4103-855e-d34c8dfbc7dc";

        // Enviar POST con Axios incluyendo API Key
        const response = await axios.post(webhookUrl, 
            { mensaje }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`  // Esto depende de cómo Make acepte la key
                }
            }
        );

        context.res = {
            status: 200,
            body: { success: true, mensaje: "Mensaje enviado al webhook." }
        };

    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 500,
            body: { error: "Error enviando mensaje", detalle: error.message }
        };
    }
};
