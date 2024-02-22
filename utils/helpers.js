module.exports = {
  booleanConverter: function (booleanText) {
    if (booleanText === true) {
      return "Yes";
    } else {
      return "No";
    }
  },
  booleanConverterRequest: function (booleanText) {
    if (booleanText === true) {
      return "Approved";
    } else if (booleanText === false) {
      return "Rejected";
    } else {
      return "Pending Admin Review";
    }
  },
};
