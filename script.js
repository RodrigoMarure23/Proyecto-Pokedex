
var pokemon1;
var container;
var container2;
var pokemon_name=null;
function buscar_pokemon() {
    
    borrar2();
    pokemon_name = document.getElementById("pokemon_search").value
    let config = {
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon?limit=1126",
      headers: {}
    }
    
    axios(config)
      .then(response => {
        let pokemon = response.data.results;
        return buscar(pokemon_name, pokemon)
      })
      .then(pokemon_encontrado => {
      
        config = {
          method: "get",
          url: pokemon_encontrado.url,
          headers: {}
        }
  
        return axios(config)
    }).then(response => {
        pokemon1 = response.data;
        container = document.getElementById("container")
        console.log(pokemon1)
  
        let html = `
          <div class="pokemon">
            <h3>${pokemon1.name}</h3>
            <img  src="${pokemon1.sprites.front_default}">
          </div>
        `
        container.innerHTML = html;    
        
    })


    
  }


  function mostrar_habilidades(){
    
    let habilidades=[]
    container2=document.getElementById("container2")
    for(let i=0;i<pokemon1.abilities.length;i++){
     habilidades.push(pokemon1.abilities[i]) 
    }
    console.log(habilidades)
    let nombres_hab=[]
    for(let i=0;i<habilidades.length;i++){
      nombres_hab.push(habilidades[i].ability.name)
    }
    container2.innerHTML=nombres_hab
    console.log(nombres_hab)
  }
  
  function buscar(pokemon_name, pokemon) {
    console.log(pokemon_name)
    for(let i=0;i<pokemon.length;i++) {
      if(pokemon[i].name === pokemon_name) {
        mostrar_boton()
        return pokemon[i]
      
      }else{
      container = document.getElementById("container")
      container.innerHTML="!Pokemon no encontrado!"
      mostrar_boton()
      esconder_boton()
      
      
      }
        
    }
  }

  function borrar2(){
    container2=document.getElementById("container2");
    container2.innerHTML="  "
  }
  function mostrar_boton(){
    
    if(pokemon_name==""){
      container = document.getElementById("container")
      container.innerHTML="!Introduce un pokemon!"
  
    
      
    }
    else{
      document.getElementById("boton_mostrar_hab").style.visibility = "visible";
    
    }
    
  }
  function esconder_boton(){
    document.getElementById("boton_mostrar_hab").style.visibility = "hidden";
  }