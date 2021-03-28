//generic ajax function
var methodTypePost = "POST";
var methodTypeGet = "GET";
function callAjaxMethod(url, method, headers, parameters, successCallback) {
  try {
    $.ajax({
      type: method,
      url: url,
      headers: headers,
      data: parameters,
      cache: false,
      beforeSend: function () {
        //enable loader
        $("#statusBar").fadeIn();
      },
      success: successCallback,
      error: function (xhr, textStatus, errorThrown) {
        //console.log(errorThrown);
        $("#statusBar").fadeOut();
      },
      complete: function () {
        //disable loader
        $("#statusBar").fadeOut();
      },
    });
  } catch (e) {
    console.log(e);
  }
}

//common ajax handler to run ajax request
var ajaxHandler = function (url, methodType, headers, parameters, func) {
  function onSuccess(response) {
    if (response === "SESSION_EXPIRED") {
      console.log("Your session is expired. Please login to continue.");
    } else func(response);
  }
  try {
    callAjaxMethod(url, methodType, headers, parameters, onSuccess);
  } catch (e) {
    console.log(e);
  }
};

export default { methodTypePost, methodTypeGet, ajaxHandler };
