$(document).ready(function () {

    var baseUrl = "https://clubfreetst.herokuapp.com/";



    $("#search").click(function (e) {

        e.preventDefault();

        $("#result").css({
            display: "none",
        });
        $("#blogID").removeClass("valid");
        $("#blogID").removeClass("invalid");


        var $blogID = $("#blogID").val();
        if($blogID.length >= 5 && $blogID.length <= 7){

            $("#blogID").addClass("valid");

            /**
             * Ajax Jquery
             * */

            $.get(baseUrl+"blogs/"+$blogID).done(function (data) {
                console.log(data);

                if(data.err){
                   alert(data.err);
                }else{
                    $("#result").css({
                        display: "block",
                    });
                    $("#blogger").text(data.blogger);
                    $("#title").text(data.title);
                    var notes = data.notes;
                    var list="";
                    notes.forEach(function (note, i) {
                        list+=`<li id=${note.id} class="list-group-item">
                            ${note.title}
                            </li>`;
                    });
                    $("#notes").html(list);
                }


            });

        }else{
            $("#blogID").addClass("invalid")
            alert("blogID is invalid (5-7 digits)");
        }
    });


    /**
     * Description: Attach a handler to one or more events for all elements that match the selector,
     * now or in the future, based on a specific set of root elements.
     * */
    $("#notes").delegate("li", "click", function () {
        console.log("delete note : "+$(this).attr('id'));
        var $noteID= $(this).attr('id');
        var $item= $(this);
        /**
         * Ajax Delete note
         * */
        $.ajax({
            url: baseUrl+"notes/"+$noteID,
            type: 'DELETE',
            success: done,
        });
        function done(data){
            console.log(data);
            if(data && data.err)
                alert(data.err);
            if(data && !data.err)
                $item.remove();
        }
    });

});