import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: {
    datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
    }]
};

 cantidades:{10, 20, 30, 40, 50, 60, 70}
 leyendas:{'A','B','C','D','F'}

 

chart: any;

  constructor() { }

  ngOnInit(): void {

    

    this.Horizontal();
  }


  Horizontal(){

    let fruits: string[] = ['Apple', 'Orange', 'Banana','Banana','Banana','Banana','Banana']; 
    let cantidad: number[] = [50,150,160,147,250,300,600]; 


    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: fruits,
        datasets: [
          {
            label: 'Cantidad',
            data: cantidad,
            borderColor: "#000000",
            fill: false,
            backgroundColor: [
              'rgba(235, 235, 25, 1)',
              'rgba(236, 59, 19, 1)',
              'rgba(41, 236, 19, 1)',
              'rgba(19, 153, 236, 1)',
              'rgba(99, 19, 236, 1)',
              'rgba(220, 24, 231, 1)',
              'rgba(21, 213, 194, 1)'
            ]
          }
        ]
      },

      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }],
        }
      }
  });


  this.chart = new Chart('bar', {
    type: 'bar',
    data: {
      labels: fruits,
      datasets: [
        {
          label: 'Cantidad',
          data: cantidad,
          borderColor: "#fff",
          fill: false,
          backgroundColor: [
            'rgba(235, 235, 25, 1)',
          'rgba(236, 59, 19, 1)',
          'rgba(41, 236, 19, 1)',
          'rgba(19, 153, 236, 1)',
          'rgba(99, 19, 236, 1)',
          'rgba(220, 24, 231, 1)',
          'rgba(21, 213, 194, 1)'
          ]
        }
      ]
    },

    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          }
        }],
      }
    }
});



this.chart = new Chart('doughnut', {
  type: 'doughnut',
  data: {
    labels: fruits,
    datasets: [
      {
        label: 'Cantidad',
        data: cantidad,
        borderColor: "#fff",
        fill: false,
        backgroundColor: [
          'rgba(235, 235, 25, 1)',
          'rgba(236, 59, 19, 1)',
          'rgba(41, 236, 19, 1)',
          'rgba(19, 153, 236, 1)',
          'rgba(99, 19, 236, 1)',
          'rgba(220, 24, 231, 1)',
          'rgba(21, 213, 194, 1)'
        ]
      }
    ]
  },

  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }],
    }
  }
});


this.chart = new Chart('pie', {
  type: 'pie',
  data: {
    labels: fruits,
    datasets: [
      {
        label: 'Cantidad',
        data: cantidad,
        borderColor: "#ffffff",
        fill: false,
        backgroundColor: [
          'rgba(235, 235, 25, 1)',
          'rgba(236, 59, 19, 1)',
          'rgba(41, 236, 19, 1)',
          'rgba(19, 153, 236, 1)',
          'rgba(99, 19, 236, 1)',
          'rgba(220, 24, 231, 1)',
          'rgba(21, 213, 194, 1)'
        ]
      }
    ]
  },

  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }],
    }
  }
});




this.chart = new Chart('polarArea', {
  type: 'polarArea',
  data: {
    labels: fruits,
    datasets: [
      {
        label: 'Cantidad',
        data: cantidad,
        borderColor: "#fff",
        fill: false,
        backgroundColor: [
          'rgba(235, 235, 25, 1)',
              'rgba(236, 59, 19, 1)',
              'rgba(41, 236, 19, 1)',
              'rgba(19, 153, 236, 1)',
              'rgba(99, 19, 236, 1)',
              'rgba(220, 24, 231, 1)',
              'rgba(21, 213, 194, 1)'              
        ]
      }
    ]
  },

  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }],
    }
  }
});




this.chart = new Chart('radar', {
  type: 'radar',
  data: {
    labels: fruits,
    datasets: [
      {
        label: 'Cantidad',
        data: cantidad,
        borderColor: "#fff",
        fill: false,
        backgroundColor: [
          'rgba(235, 235, 25, 1)',
          'rgba(236, 59, 19, 1)',
          'rgba(41, 236, 19, 1)',
          'rgba(19, 153, 236, 1)',
          'rgba(99, 19, 236, 1)',
          'rgba(220, 24, 231, 1)',
          'rgba(21, 213, 194, 1)'
        ]
      }
    ]
  },

  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }],
    }
  }
});


this.chart = new Chart('radar2', {
  type: 'bar',
  data: {
      datasets: [{
          label: 'Bar Dataset',
          data: [10, 20, 30, 40],
          // this dataset is drawn below
          order: 1
      }, {
          label: 'Line Dataset',
          data: [10, 10, 10, 10],
          type: 'line',
          // this dataset is drawn on top
          order: 2
      }],
      labels: ['January', 'February', 'March', 'April']
  },
  options: {
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }],
    }
  }
});







  }



}
