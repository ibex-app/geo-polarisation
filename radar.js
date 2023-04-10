var marksCanvas = document.getElementById("radar");




var marksData = {
  labels: ["August War",
  "Russia Ukraine",
  "Georgia Russia and Ukraine",
  "Mikheil Saakashvili",
  "liberal-conservative",
  "Western foreign policy",
  "Russian foreign policy",
  "The role of NGO's",
  "Media independence",
  "Russian migration",
  "Oligarchs",
  "De-polarization",
  "Economic",],
  datasets: [{
    label: "Pole A",
    backgroundColor: "rgba(200,0,0,0.2)",
    borderColor: "rgba(200,0,0,0.4)",
    data: [67, 35, 30, 20, 10, 40, 35, 25, 70, 80, 60, 80, 33]
  }, {
    label: "Neutral",
    backgroundColor: "rgba(0,0,200,0.2)",
    borderColor: "rgba(200,0,0,0.4)",
    data: [54, 54, 65, 60, 70, 70, 75, 65, 7,  60, 70, 70, 75]
  }, {
    label: "Pole B",
    backgroundColor: "rgba(0,0,200,0.2)",
    borderColor: "rgba(200,0,0,0.4)",
    data: [54, 65, 60, 80, 65, 75, 70, 70, 54, 65, 60, 70, 75]
  }]
};

config = {
    type: 'radar',
    data: marksData,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    },
  };

// var radarChart = new Chart(marksCanvas, config);