// const LETHUB = "https://app.lethub.co/#/"

// ;(function () {
//   function retrieveUserData() {
//     console.log("Attempting to retrieve user data from localStorage...")

//     const userId = localStorage.getItem("userId")
//     const userEmail = localStorage.getItem("userEmail")
//     const username = localStorage.getItem("username")
//     const companyName = localStorage.getItem("companyName")
//     const role = localStorage.getItem("role")
//     const token = localStorage.getItem("token")

//     console.log("userId:", userId)
//     console.log("userEmail:", userEmail)
//     console.log("username:", username)
//     console.log("companyName:", companyName)
//     console.log("role:", role)

//     if (userId && userEmail && username && companyName && role && token) {
//       const userData = {
//         userId: userId,
//         userEmail: userEmail,
//         username: username,
//         companyName: companyName,
//         role: role,
//         token: token
//       }

//       console.log("All required data found. Posting message:", userData)
//       window.postMessage(
//         { type: "USER_ID_FROM_LOCALSTORAGE", userData: userData },
//         "*"
//       )
//     } else {
//       console.log("Required data missing. Retrying in 500ms...")
//       setTimeout(retrieveUserData, 500) // 500ms delay
//     }
//   }

//   if (window.location.href === LETHUB) {
//     retrieveUserData()
//   } else {
//     console.log("URL does not match. Function will not run.")
//   }
// })()

const LETHUB = "https://app.lethub.co/#/"
const MAX_RETRIES = 160 // Number of times to retry
const RETRY_INTERVAL = 1000 // Interval in ms between retries

;(function () {
  let retryCount = 0

  function retrieveUserData() {
    console.log("Attempting to retrieve user data from localStorage...")

    const userId = localStorage.getItem("userId")
    const userEmail = localStorage.getItem("userEmail")
    const username = localStorage.getItem("username")
    const companyName = localStorage.getItem("companyName")
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")

    console.log("userId:", userId)
    console.log("userEmail:", userEmail)
    console.log("username:", username)
    console.log("companyName:", companyName)
    console.log("role:", role)

    if (userId && userEmail && username && companyName && role && token) {
      const userData = {
        userId: userId,
        userEmail: userEmail,
        username: username,
        companyName: companyName,
        role: role,
        token: token
      }

      console.log("All required data found. Posting message:", userData)
      window.postMessage(
        { type: "USER_ID_FROM_LOCALSTORAGE", userData: userData },
        "*"
      )
    } else {
      console.log("Required data missing. Retrying in 500ms...")
      setTimeout(retrieveUserData, 500) // 500ms delay
    }
  }

  function checkURLAndRetrieveData() {
    console.log("URL:", window.location.href)
    if (window.location.href === LETHUB) {
      console.log("URL matches. Starting data retrieval...")
      retrieveUserData()
    } else if (retryCount < MAX_RETRIES) {
      retryCount++
      console.log(
        `URL does not match. Retrying (${retryCount}/${MAX_RETRIES}) in ${RETRY_INTERVAL}ms...`
      )
      setTimeout(checkURLAndRetrieveData, RETRY_INTERVAL)
    } else {
      console.log("Max retries reached. Function will not run.")
    }
  }

  checkURLAndRetrieveData()
})()
