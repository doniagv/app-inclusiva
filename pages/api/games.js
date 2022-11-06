const superagent = require("superagent");

export default function handler(req, res) {
  //   const number = Number(req.query.number);

  //   if (isNaN(number) || typeof number !== "number") {
  //     res.status(400).send("Invalid request!!");
  //   }
  superagent.get(`https://itch.io/api/1/${process.env.NEXT_PUBLIC_API_KEY}/my-games`).then((response) => {
    res.status(200).send(response.text);
    return response.text;
  });
  //   superagent.get(`http://numbersapi.com/${number}`).then((response) => {
  //     res.status(200).send(response.text);
  //   });
}
