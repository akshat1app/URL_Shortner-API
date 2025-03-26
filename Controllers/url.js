const URL = require("../Models/url");
const shortid = require("shortid"); // using shortid package

async function HandleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) res.status(400).json({ error: "URL is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.send(`Shortened URL: <b>http://localhost:3000/url/${shortID}</b>`);
}

async function HandleGetLongURL(req, res) {
  const shortID = req.params.id;
  if (!shortID) res.status(400).json({ error: "shortID is required" });
  const data = await URL.findOneAndUpdate(
    {
      shortId: shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!data) res.status(400).json({ error: "URL not found" });
  res.redirect(data.redirectURL);
}

async function HandleGetAnalytics(req, res) {
  const shortID = req.params.id;
  if (!shortID) res.status(400).json({ error: "shortID required" });

  const data = await URL.findOne({ shortId: shortID });
  if (!data) res.status(400).json({ error: "URL not found" });

  res.json({
    Total_Hits: data.visitHistory.length,
    Analytics: data.visitHistory,
  });
}

async function HandleTest(req, res) {
  if(!req.user) return res.redirect('login')
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
}

module.exports = {
  HandleGenerateShortURL,
  HandleGetLongURL,
  HandleGetAnalytics,
  HandleTest,
};
