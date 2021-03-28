module.exports = {
    index: async (req, res) => {
      res.status(200).render("about/index");
    },
};