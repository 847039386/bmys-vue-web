export function dealPath(host ,path){
  let new_path ,reg = /(https?\:\/\/.*?)\/.*/;
  if(reg.test(path)){
    return path;
  }else{
    if(path.split('\/').length > 1){
      new_path = host+ '/' + path.split('\/').splice(1).join('/')
    }else{
      new_path = host+ '/' + path.split('\\').splice(1).join('/')
    }
    return new_path;
  }
}
