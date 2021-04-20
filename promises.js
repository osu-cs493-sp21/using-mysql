function waitAndEcho(message, callback) {
  setTimeout(() => {
    callback(message);
  }, 1000);
}

// waitAndEcho("This is my message", (data) => {
//   console.log(data);
// });

// waitAndEcho("3", (data) => {
//   console.log(data);
//   waitAndEcho("2", (data) => {
//     console.log(data);
//     waitAndEcho("1", (data) => {
//       console.log(data);
//       waitAndEcho("... blastoff", (data) => {
//         console.log(data);
//       });
//     });
//   });
// });

function waitAndEchoWithPromise(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message === 'generate error') {
        reject({
          err: 'Error!'
        });
      } else {
        resolve(message);
      }
    }, 1000);
  });
}

// waitAndEchoWithPromise("3")
//   .then((data) => {
//     console.log(data);
//     return waitAndEchoWithPromise("2");
//   })
//   .then((data) => {
//     console.log(data);
//     return waitAndEchoWithPromise("1");
//   })
//   .then((data) => {
//     console.log(data);
//     return waitAndEchoWithPromise("... blastoff");
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

async function doWaitAndEchoes() {
  try {
    let data = await waitAndEchoWithPromise("3");
    console.log(data);
    data = await waitAndEchoWithPromise("2");
    console.log(data);
    data = await waitAndEchoWithPromise("generate error");
    console.log(data);
    data = await waitAndEchoWithPromise("... blastoff!");
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

doWaitAndEchoes();
console.log("This will print before the countdown...");
console.log("This will too!");
