module.exports = {
    index: async (req, res) => {
      res.status(200).render("payment/index");
    },
};