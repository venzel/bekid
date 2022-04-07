(() => {
    var x = 'White Dog';
    var arr = x.split(''); // ["W", "h", "i", "t", "e", " ", "D", "o", "g"]
    arr.splice(6, 1, 'F');

    /* 
      Here 6 is starting index and 1 is no. of array elements to remove and 
      final argument 'F' is the new character to be inserted. 
    */
    var result = arr.join(''); // "White Fog"

    console.log(result);
})();
