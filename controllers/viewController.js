exports.viewHome =  (req, res) => {
  res.status(200).render('index', {
    title: 'All Tour',
  });
};