const superagent = require("superagent");

// Api para obtener los juegos de itch.io que tiene el usuario tiene creados
export default function handler(req, res) {
  superagent.get(`https://itch.io/api/1/${process.env.NEXT_PUBLIC_API_KEY}/my-games`).then((response) => {
    res.status(200).send(response.text);
    return response.text;
  });
}
