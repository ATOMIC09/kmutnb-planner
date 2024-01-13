<template lang="">
    <div>
      <ul>
        <li><a href="/">My App</a></li>
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    
  }
  </script>
  <style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }
  li {
    float: left;
  }
  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  </style>