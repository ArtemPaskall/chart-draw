
type Configuration = {
    type: string,
    data: {
      labels: string[],
      datasets: [{
          label: string,
          data: number[],
          backgroundColor: string[],
        borderColor: string[],
        borderWidth: number
      }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: boolean
            }
        }
    }
  };