$('#titleInput').on('input', function(){
  const id = parseInt(window.location.href.charAt(window.location.href.length - 1));
    $.ajax({
      url: `/jurnal/${id}`,
      dataType: "json",
      method: "PUT",
      data: { title: this.value },
      success: function(data,status)
      {
        if(data.code === 200) return;
      },
      error: function(data,status,err){
        console.error(err);
        return;
      }
    })
    autoResize(this);
});

$("#contentInput").on('input', function()
{
  const id = parseInt(window.location.href.charAt(window.location.href.length - 1));
  $.ajax({
    url: `/jurnal/${id}`,
    dataType: "json",
    method: "PUT",
    data: { content: this.value },
    success: function(data,status)
    {
      if(data.code === 200) return;
    },
    error: function(data,status,err){
      console.error(err);
      return;
    }
  })
    autoResize(this);
});

$("#deleteJurnal").on('click', function(){
    Swal.fire({
        title: "Deleted?",
        text: "Pikirkan Baik-baik sebelum menghapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Hapus"
      }).then((result) => {
        if (result.isConfirmed) {
          const id = $(this).data('id');
          $.ajax({
            url:`/jurnal/${id}`,
            method:"DELETE",
            success: function (data,status)
            {
                if(data.code === 200)
                {
                    Swal.fire({
                        title: "Terhapus",
                        text: "Jurnal Berhasil Terhapus",
                        icon: "success",
                        showConfirmButton: false,
                        timer:1000,
                      });
                      setTimeout(() => {
                          return window.location.replace(data.redirect);
                      },1500)

                }
            }
          })
        }
      });
});

const autoResize = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}