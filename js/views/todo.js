var app = app || {}

app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {
        'click .toggle' : 'toggleCompleted',
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'click .destroy' : 'clear',
        'blur .edit' : 'close'
    },
    initialize : function(){
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove)
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },
    render : function(){
        this.$el.html( this.template(this.model.toJSON() ) );
        this.$input = this.$('.edit');
        this.$el.toggleClass( 'completed', this.model.get('completed'));
        this.toggleVisible();
        return this;
    },
    edit : function(){
        this.$el.addClass('editing');
        this.$input.focus();
    },
    updateOnEnter : function(){
        if (e.which === ENTER_KEY){
            this.close();
        }
    },
    close : function(){
        var title = this.$input.val().trim();
        if (title) {
            this.model.save({ title: title});
        }
        this.$el.removeClass('editing');
    },
    toggleCompleted: function(){
        this.model.save({ completed: !this.model.get('completed') });
    },
    clear: function(){
        this.model.delete();
    },
    remove: function(){
        this.$el.remove();
    },
    toggleVisible: function(){
        this.$el.toggleClass('hidden', this.isHidden());
    },
    isHidden : function(){
        var isCompleted = this.model.get('completed');
        return (app.TodoFilter === 'completed' && !isCompleted) ||
            (app.TodoFilter === 'active' && isCompleted);
    }
});