$(document).ready(function () {

    var baseUrl = "https://clubfreetst.herokuapp.com/";

    $("#blogID").val();
    $("#search").click(function (e) {
        e.preventDefault();
        var $blogID = $("#blogID").val();
        if($blogID.length >= 5 && $blogID.length <= 7){
            /**
             * Ajax Jquery
             * */

            $.get(baseUrl+"blogs/"+$blogID).done(function (data) {
                console.log(data);
                $("#result").css({
                    display: "block",
                });

                $("#blogger").text(data.blogger);
                $("#title").text(data.title);
                var notes = data.notes;
                var list="";
                notes.forEach(function (note, i) {
                    list+=`<li id=${note.id}>
                            ${note.title}
                            </li>`;
                });
                $("#notes").html(list);
            });



        }
    });

});