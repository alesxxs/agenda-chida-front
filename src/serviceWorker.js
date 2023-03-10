// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" ||
//     window.location.hostname === "[::1]" ||
//     window.location.hostname.match(/^192\.168\.\d+\.\d+$/)
// );

export function register(config) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }

      navigator.serviceWorker
        .register("/service-worker.js", config)
        .then((registration) => {
          console.log("Service worker registered:", registration);
        })
        .catch((error) => {
          console.error("Error registering service worker:", error);
        });
    });
  }
}

// function registerValidSW(swUrl, config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 "Se ha encontrado una nueva actualización del Service Worker, se recargará la página."
//               );

//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log("La aplicación se carga por primera vez.");
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error durante el registro del Service Worker:", error);
//     });
// }

// function checkValidServiceWorker(swUrl, config) {
//   fetch(swUrl, {
//     headers: { "Service-Worker": "script" },
//   })
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No se pudo encontrar el Service Worker. La aplicación se cargará en línea."
//       );
//     });
// }

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
