const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.post("/dialogflow-fulfillment", (request, response) => {
  const queryResult = request.body.queryResult;
  const product = queryResult.parameters.product;
  const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product)}`;

  const fulfillmentText = `${searchUrl}`;
  const fulfillmentResponse = {
    fulfillmentMessages: [
      {
        text: {
          text: [
            "Please copy below url and paste it in your browser to get search results",
          ],
        },
      },
      {
        text: {
          text: [fulfillmentText],
        },
      },
      {
        text: {
          text: ["Do you want to search anything else?"],
        },
      },
    ],
  };

  response.json(fulfillmentResponse);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
