use = () ->
  newInstance = new NailApi
  newInstance.parent =this
  newInstance.modules = []
  newInstance.lib = @lib

  for module in @modules
    newInstance.modules.push module
  for module in arguments
    newInstance.modules.push module

  return newInstance
