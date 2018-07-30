(function($){
    handleFocus = function(){
        var $this = $(this);
        if($this.val() === $this.attr('placeholdernl')){
            $this.val('');
            $this.removeClass("multipleLinePlaceholder");
        }
    };

    handleBlur = function(){
        var $this = $(this);
        if($this.val() == ''){
            $this.val($this.attr('placeholdernl'));
            $this.addClass("multipleLinePlaceholder");
        }
    };
    $('textarea[placeholdernl]').each(function(){
        var $this = $(this),
            value = $this.val(),
            placeholder = $this.attr('placeholder');
        $this.attr('placeholdernl', value ? value : placeholder);
        $this.val('');
        $this.focus(handleFocus).blur(handleBlur).trigger('blur');
    });
})(jQuery);