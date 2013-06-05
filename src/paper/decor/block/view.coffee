# {{view:{name:"ablah", source: "/source.js" }}}
# OR
# {{#view:{name"ablah"}}}
# blah
# {{/}}


class ViewDecor extends require("./base")
    
  ###
  ###

  bind: () ->
    super()
    @child.bind()

  ###
  ###

  dispose: () ->
    super()
    @child.dispose()

  ###
  ###

  load: (context) ->
    tplName = "template.#{@clip.get("view.name") or @clip.get("view")}"
    wth = @clip.get("view.model") or undefined
    tpl = context.internal.get(tplName)
    return if not tpl
    child = context.child().detachBuffer()

    if @node.content
      @node.content.load child


    child.set "content", child.buffer.join("")
    child.attachBuffer()
    @child = tpl.node.createContent()
    @child.load @_childContext = child.child(wth)

  ###
  ###

  _onChange: () ->
    @_childContext?.reset @clip.get "view.model"
  

module.exports = ViewDecor