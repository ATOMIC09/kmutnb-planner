<template lang="">
    <div class="card">
      <img src="https://content.phuket101.net/wp-content/uploads/20220119201739/maya-bay-phi-phi.jpg" alt="Phi Phi Islands" style="width:100%" />
      <div className="container">
        <h3>Phi Phi Islands</h3>
        <p>Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the Malacca Coastal Strait of Thailand.</p>
      </div>
    </div>
  </template>
  <script>
  export default {
    
  }
  </script>
  <style scoped>
  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding-bottom: 10px;
  }
  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  /* Add some padding inside the card container */
  .container {
    padding: 2px 16px;
  }
  </style>