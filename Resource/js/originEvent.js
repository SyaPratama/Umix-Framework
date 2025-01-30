$.when($.ready).then(function(){
  (function start() {
    requestAnimationFrame(start);
    const flashsesion = sessionStorage.getItem("FLASH_MESSAGE") ?? null;
    if (flashsesion) {
        $(".alert").removeAttr("hidden");
        const message = JSON.parse(flashsesion);
        $(".alert").attr('class',message?.error ?? message?.success);
        $(".alert #close > svg").attr('class', message?.closed);
        $("#text_alert").text(message.message);
        if (!$(".alert").attr("hidden")) {
          setTimeout(() => {
            sessionStorage.clear();
          },500);
        }
  
      $("#close").on("click", function () {
        $(".alert").attr("hidden", "");
      });
    }
  })();

  $("#register").on("submit",function (e) {
    e.preventDefault();
    const DT = new FormData(this);
    const Object = {
      username: DT.get("username"),
      password: DT.get("password"),
      email: DT.get("email"),
      password_confirmation: DT.get("password_confirmation"),
    };
    $.ajax({
      url: "/regist-handler",
      dataType: "json",
      method: "POST",
      data: Object,
      success: function (data, status) {
        if (data.code === 201) {
          window.location.replace(data?.redirect);
          return sessionStorage.setItem(
            "FLASH_MESSAGE",
            JSON.stringify({
              status: data?.status,
              message: data?.message,
              success: "alert w-[50%] bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative",
              closed:  "fill-current h-6 w-6 text-green-500"
            })
          );
        }
      },
      error: function (data, status, err) {
        if (data.status === 400) {
          sessionStorage.setItem(
            "FLASH_MESSAGE",
            JSON.stringify({
              status: data?.responseJSON?.status,
              message: data?.responseJSON?.message,
              error: "alert w-[50%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
              closed: "fill-current h-6 w-6 text-red-500"
            })
          );
        }
      },
    });
  });
  
  $("#login").on('submit',function(e) {
      e.preventDefault();
      const DT = new FormData(this);
      const Object = {
        email: DT.get('email'),
        password: DT.get('password'),
        remember: DT.get('remember') == "on" ? true : false,
      };
      $.ajax({
        url: "/login-handler",
        dataType: "json",
        method: "POST",
        data: Object,
        success: function(data,status){
          if(data.code === 200)
          {
            return window.location.replace(data?.redirect);
          }
        },
        error: function (data, status, err) {
          if (data.status === 400) {
            sessionStorage.setItem(
              "FLASH_MESSAGE",
              JSON.stringify({
                status: data?.responseJSON?.status,
                message: data?.responseJSON?.message,
                error: "alert w-[50%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
                closed: "fill-current h-6 w-6 text-red-500"
              })
            );
          }
        },
      });
  })
  
  
  $("#signout").on('click',function(e){
    e.preventDefault();

    Swal.fire({
      title: "Logout?",
      text: "Jika iya silahkan lanjutkan",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lanjutkan"
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url:"/signout",
          dataType: 'json',
          method: "POST",
          success: function(data,status){
            if(data.code === 200)
            {
              return window.location.replace(data?.redirect);
            }
          }
        })
      }
    });
  });  
});