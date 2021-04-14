function waitAndEcho(message, callback) {
  setTimeout(() => {
    callback(message);
  }, 1000);
}

waitAndEcho("3", (data) => {
  console.log(data);
  waitAndEcho("2", (data) => {
    console.log(data);
    waitAndEcho("1", (data) => {
      console.log(data);
      waitAndEcho("... blastoff", (data) => {
        console.log(data);
      });
    });
  });
});
