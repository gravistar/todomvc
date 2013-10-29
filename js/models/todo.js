var app = app || {};

app.Todo = Backbone.model.extend({
    defaults: {
        title: '',
        completed: false
    },
    toggle: function(){
        this.save({completed: !this.get('completed')});
    }
});