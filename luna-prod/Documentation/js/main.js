
/**
 * Tuna Signup Form Wizard
 * @type Javascript Class
 */

var lunaWizard = {
    stepCount: 0,
    /**
     * Resize for Responsive
     */
    setResponsive: function () {
        var self = this;
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        windowHeight = windowHeight > 360 ? windowHeight : 360;
        var lunaContainer = $(".luna-signup-container");
        var lunaLeft = $(".luna-signup-left");
        var lunaLeftOverlay = $(".luna-signup-left-overlay");

       /*  if (windowWidth >= 768) {
            lunaContainer.add(lunaLeft).add(lunaLeftOverlay).innerHeight(windowHeight);
        } else {
            lunaContainer.add(lunaLeft).add(lunaLeftOverlay).css("height", "auto");
        } */
        
        
        lunaLeftOverlay.width(($(window).width()-$(".container").width())/2+10);        
       

    },
    /**
     * Change Step
     * @param int currentStep
     * @param int nextStep
     * @returns {void|Boolean}
     */
  
    /**
     * Show Validation Message
     * @param HtmlElement el
     * @returns void
     */
    
    /**
     * Check email is valid or not
     * @param String value
     * @returns Boolean
     */
   
    /**
     * Executes Signup Wizard
     * @returns void
     */
    start: function () {
        var self = this;

        //Jquery Uniform Plugin
      /*   $(".luna-signup-container input[type='checkbox'],.luna-signup-container input[type='radio'], .select").uniform(); */

        //Jquery Mask Plugin
       /*  $('.luna-signup-container input[name="phone"],.luna-signup-container input[name="tn_phone"]').mask('000000000'); */
        

        //Datepicker
       /*  $(".datepicker").datepicker().on('changeDate', function(e){
            $(this).datepicker('hide');
            $(this).focus().parents(".form-group").find(".errorIcon").remove();
        }); */
        
        // Focuses on name input, when page loaded
        window.setTimeout(function () {
            $("#tn_name").focus();
        }, 500);

        // Responsive
        self.setResponsive();
        $(window).resize(function () {
            self.setResponsive();
        });

        // Steps Count
        self.stepCount = $(".luna-steps .step").length;
        $(".luna-steps .step").each(function () {
            $(".dots").append("<li><span></span></li>")
            $(".step-count").text(self.stepCount);
        });
        $(".dots span").first().addClass("selected");

        // Next Step
        $(".nextStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) + 1;
            self.changeStep(currentStep, nextStep);
        });

        // Prev Step
        $(".prevStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) - 1;
            self.changeStep(currentStep, nextStep);
        });

        // Confirm Details - Show Input
        var stepConfirm = $(".step-confirm");
        stepConfirm.find(".input-container a.editInput").on("click", function () {
            $(this).parent().find("input").focus();
        });

        // Confirm Details - Show Password
        stepConfirm.find(".input-container a.showPass").on("mousedown", function () {
            $(this).parent().find("input").attr("type", "text");
        }).mouseup(function () {
            $(this).parent().find("input").attr("type", "password");
        });

        stepConfirm.find(".input-container input").on("focus", function () {
            $(this).parent().find("a").hide();
        });

        stepConfirm.find(".input-container input").on("focusout", function () {
            if (!$(this).hasClass("confirm-input-error")) {
                $(this).parent().find("a").show();
            }
        })

      /*   stepConfirm.find("select").on('shown.bs.select', function (e) {
            $(this).parents(".form-group").find("a.editInput").hide();
        }).on('hidden.bs.select', function (e) {
            $(this).parents(".form-group").find("a.editInput").show();
        }); */

        //Press Enter and go to nextStep
        $(".step input").not(".step-confirm input").on("keypress", function (e) {
            if (e.keyCode === 13) {
                $(".button-container .nextStep").click();
            }
        });

        var signupForm = $("form[name='signupForm']");
        //Finish Button
        $(".finishBtn").on("click", function () {
            signupForm.submit();
        })

        // Form Submit
        signupForm.on("submit", function (e) {

            e.preventDefault();


            if (!$("input[name='agreement']").prop("checked")) {
                swal({
                    title: "Warning!",
                    text: "You must agree with the terms and conditions.",
                    type: "warning",
                    confirmButtonText: "Ok"
                });
                return;
            }

            swal({
                title: null,
                text: "<img class='luna_loading' src='images/loading.svg'/> Saving...",
                html: true,
                showConfirmButton: false
            });

            //Send form to php file
            $.post("smtp.php", $(this).serialize(), function (result) {
                if (result.success) {
                    swal({
                        title: "Success",
                        text: "Your information submitted successfully!",
                        type: "success",
                        confirmButtonText: "Ok"
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: result.msg,
                        type: "error",
                        confirmButtonText: "Ok"
                    });
                }
            }, 'json');

        });


    },
}


/**
 * Material Input 
 * @returns object
 */
$.fn.materialInput = function () {

    var label;
    var el = this;

    el.find('input.formInput').focus(function (e) {
        el.setLabel(e.target);
        el.checkFocused(e.target);
    });

    el.find('input.formInput').focusout(function (e) {
        el.setLabel(e.target);
        el.checkUnFocused(e.target);
    });

    el.find('input.formInput').keypress(function (e) {
        $(this).parents(".form-group").find(".errorIcon").hide();
    });

    this.setLabel = function (target) {
        label = el.find('label[for=' + target.id + ']');
    };

    this.getLabel = function () {
        return label;
    };

    this.checkFocused = function (target) {
        el.getLabel().addClass('active', '');
        $(target).removeClass("input-error");
    };

    this.checkUnFocused = function (target) {
        if ($(target).val().length === 0) {
            el.getLabel().removeClass('active');
        }
    };
};

function handleFileSelect()
{
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        //fr.readAsText(file);
        fr.readAsDataURL(file);
    }
}


$(document).ready(function () {

    /**
     * Page Loader
     * If you remove loader, you can delete .luna-loader-container element from Html, and delete this two rows.
     */
    $(".luna-loader-container").fadeOut("slow");
    $(".luna-signup-container").show();


    /**
     * Material Inputs
     * Makes, inputs in selected element material design.
     */
    $(".luna-steps").materialInput();

    /**
     * Bootstrap Select Plugin
     */
   /*  $(".selectpicker").selectpicker(); */

    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    lunaWizard.start();

});
