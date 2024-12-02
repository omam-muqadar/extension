;(function () {
  function retrieveUserData() {
    console.log("Attempting to retrieve user data from localStorage...")

    const userId = localStorage.getItem("userId")
    const userEmail = localStorage.getItem("userEmail")
    const username = localStorage.getItem("username")
    const companyName = localStorage.getItem("companyName")
    const role = localStorage.getItem("role")

    console.log("userId:", userId)
    console.log("userEmail:", userEmail)
    console.log("username:", username)
    console.log("companyName:", companyName)
    console.log("role:", role)

    if (userId && userEmail && username && companyName && role) {
      const userData = {
        userId: userId,
        userEmail: userEmail,
        username: username,
        companyName: companyName,
        role: role
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

  if (window.location.href === "https://lethub-uat.netlify.app/#/") {
    retrieveUserData()
  } else {
    console.log("URL does not match. Function will not run.")
  }
})()
