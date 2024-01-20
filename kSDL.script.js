const cst = {

  PROPS: {

    Main_ID:{ selector: "" },
    Toggle:{
      class_name: "kSDL-toggle",
      class_name_ext: "kSDL-toggle-zero",
      selector: ".kSDL-toggle",
      elm_tag: "a"
    },
    Container:{
      class_name: "kSDL-container", 
      selector: ".kSDL-container",
      elm_tag: "div"
    },
    Ctrl:{
      class_name: "kSDL-ctrl", 
      selector: ".kSDL-container .kSDL-ctrl",
      elm_tag: "div"
    },
    Ctrl_Selection:{
      class_name: "kSDL-selection",
      selector: ".kSDL-container .kSDL-ctrl .kSDL-selection",
      elm_tag: "button"
    },
    Ctrl_Search:{
      class_name: "kSDL-search", 
      class_name_ext: "kSDL-search-fail",
      selector: ".kSDL-container .kSDL-ctrl .kSDL-search",
      elm_tag: "input"
    },
    Ctrl_Clear:{
      class_name: "kSDL-clear",
      selector: ".kSDL-container .kSDL-ctrl .kSDL-clear",
      elm_tag: "button"
    },
    List:{
      class_name: "kSDL-list",
      selector: ".kSDL-container .kSDL-list",
      elm_tag: "div"
    },
    List_Item:{
      class_name: "kSDL-item",
      selector: "ul > li > input",
      qs_all: true
    },
    ULLI:{
      selector: "ul > li",
      qs_all: true
    }

  },

  DEFAULT_SETTINGS: {

    allItemChecked: false,
    containerHeight: "auto",
    containerHeightMax: "350px",
    containerWidth: "300px",
    Ctrl: true,
    CtrlSelection: true,
    CtrlSearch: true,
    fontSize: "12px",
    onlySelectedCounter: false,
    singleSelectMode: false
    
  },

  STYLE_SETTINGS: ["containerHeight","containerHeightMax","containerWidth","fontSize"],

  get ALLOWED_LISTENERS(){ return [this.PROPS.Toggle.class_name,this.PROPS.Ctrl_Selection.class_name,this.PROPS.Ctrl_Search.class_name,this.PROPS.Ctrl_Clear.class_name,this.PROPS.List_Item.class_name]; }

}

var glb = {

  ID: {

    Last_Clicked: "INI",
    qs: "INI"

  },
  ELEMENTS: {},
  SETTINGS: {}

}

/* ---------- ---------- ---------- ---------- ---------- */

var kSDL = {

  NEW(r_ID){

    if(! this.Check_Elements_Identifiers(r_ID)){ return false; }

    for(vKey in r_ID){

      glb.ID.qs = vKey;

      glb.ELEMENTS[vKey] = [];
      glb.SETTINGS[vKey] = this.Check_Active_Settings(r_ID[vKey]);

      // AVOID SETTINGS COLLISION
      if(glb.SETTINGS[vKey].CtrlSelection.STTNG == false && glb.SETTINGS[vKey].CtrlSearch.STTNG == false){ glb.SETTINGS[vKey].Ctrl.STTNG = false; }
      if(glb.SETTINGS[vKey].allItemChecked.STTNG == true && glb.SETTINGS[vKey].singleSelectMode.STTNG == true){ glb.SETTINGS[vKey].allItemChecked.STTNG = false; }
      if(glb.SETTINGS[vKey].singleSelectMode.STTNG){ glb.SETTINGS[vKey].CtrlSelection.STTNG = false; }
      
      this.Element_Declare("Main_ID");

      this.qs("Main_ID").appendChild(this.Element_Create("Toggle"));
      this.Element_Declare("Toggle");

      this.qs("Main_ID").appendChild(this.Element_Create("Container"));
      this.Element_Declare("Container");

      if(glb.SETTINGS[vKey].Ctrl.STTNG){

        this.qs("Container").appendChild(this.Element_Create("Ctrl"));
        this.Element_Declare("Ctrl");

        if(glb.SETTINGS[vKey].CtrlSelection.STTNG){

          this.qs("Ctrl").appendChild(this.Element_Create("Ctrl_Selection"));
          this.Element_Declare("Ctrl_Selection");

        }

        if(glb.SETTINGS[vKey].CtrlSearch.STTNG){

          this.qs("Ctrl").appendChild(this.Element_Create("Ctrl_Search"));
          this.Element_Declare("Ctrl_Search");

          this.qs("Ctrl").appendChild(this.Element_Create("Ctrl_Clear"));
          this.Element_Declare("Ctrl_Clear");

        }

      }

      this.qs("Container").appendChild(this.Element_Create("List"));
      this.Element_Declare("List");

      this.qs("List").appendChild(this.qs("Main_ID").querySelector("ul"));

      this.Element_Declare("List_Item");

      this.qs("List_Item").forEach(fe_ListItem =>{ 

        fe_ListItem.type = (glb.SETTINGS[vKey].singleSelectMode.STTNG) ? "radio" : "checkbox";
        fe_ListItem.className = cst.PROPS.List_Item.class_name;

        if(glb.SETTINGS[vKey].allItemChecked.STTNG){ fe_ListItem.checked = true; }

      });

      this.Element_Declare("ULLI");

      if(glb.SETTINGS[vKey].fontSize.CSTMZ){ this.qs("ULLI").forEach(fe_ULLI =>{ fe_ULLI.style.fontSize = glb.SETTINGS[vKey].fontSize.STTNG; }); }


      /* ---------- ---------- ---------- ---------- ---------- */

      if(glb.SETTINGS[vKey].singleSelectMode.STTNG){

        if(this.Listitem_Info().count !== 1){ 

          this.qs("List_Item").forEach(fe_ListItem =>{ fe_ListItem.checked = false; });

          this.qs("List_Item")[0].checked = true;

        }
        else{

          this.qs("List_Item").forEach(fe_ListItem =>{ if(fe_ListItem.checked == true){ return; }; });

        }
        
      }

      /* ---------- ---------- ---------- ---------- ---------- */

      this.Change_iHTML();

      document.querySelectorAll("ul").forEach(fe_UL =>{ fe_UL.style.display = "block"; });

      console.log("`" + vKey + "` successfully loaded...");

      delete glb.ELEMENTS[vKey].Main_ID;
      delete glb.ELEMENTS[vKey].Ctrl;
      delete glb.ELEMENTS[vKey].List;

      for(vProperty in glb.SETTINGS[vKey]){ delete glb.SETTINGS[vKey][vProperty].CSTMZ; }

    };

    delete glb.DEFAULT_SETTINGS;

  },

  Check_Elements_Identifiers(r_ID){

    let rCheckID = [];
    rCheckID.return = true;
    rCheckID.err = "Err: K10\n\n";

    for(vKey in r_ID){

      if(document.getElementById(vKey) === null){ 

        rCheckID.err += `ID: '${vKey}' doesn't exist!\n`;
        rCheckID.return = false;

      }

      if(! this.Check_Is_Object(r_ID[vKey])){ 

        rCheckID.err += `ID: '${vKey}' isn't an object!\n`;
        rCheckID.return = false; 

      }

    }

    if(! rCheckID.return){ alert(rCheckID.err); }

    return rCheckID.return;

  },

  Check_Active_Settings(r_ID){

    let rSettings__Return = [];

    if(this.Check_Is_Object(r_ID)){

      for(const [key, value] of Object.entries(cst.DEFAULT_SETTINGS)){

        rSettings__Return[key] = {STTNG: null, CSTMZ: false}

        rSettings__Return[key].STTNG = (r_ID.hasOwnProperty(key)) ? r_ID[key] : value;

        if(cst.STYLE_SETTINGS.includes(key)){ rSettings__Return[key].CSTMZ = (rSettings__Return[key].STTNG == value) ? false : true; }

      }

    }

    return rSettings__Return;

  },

  Check_Is_Object(r_ID){ return (typeof r_ID === 'object' && r_ID !== null && !Array.isArray(r_ID)); },

  Element_Create(f_ELEMENT){

    let new_Element = document.createElement(cst.PROPS[f_ELEMENT].elm_tag);

    new_Element.className = cst.PROPS[f_ELEMENT].class_name;

    switch(f_ELEMENT){

      case "Toggle":
        new_Element.href = "javascript:void(0);";
        break;

      case "Container":
        if(glb.SETTINGS[vKey].containerWidth.CSTMZ){ new_Element.style.width = glb.SETTINGS[vKey].containerWidth.STTNG; }
        if(glb.SETTINGS[vKey].containerHeight.CSTMZ){ new_Element.style.height = glb.SETTINGS[vKey].containerHeight.STTNG; }
        if(glb.SETTINGS[vKey].containerHeightMax.CSTMZ){ new_Element.style.maxHeight = glb.SETTINGS[vKey].containerHeightMax.STTNG; }
        break;

      case "Ctrl_Selection":
        new_Element.type = "button";
        break;

      case "Ctrl_Search":
      
        new_Element.type = "text";
        new_Element.placeholder = "Search ...";
        new_Element.maxLength = 30;
        new_Element.setAttribute("autocomplete","off");

        if(! glb.SETTINGS[vKey].CtrlSelection.STTNG){
          new_Element.style.marginLeft = "0px";
          new_Element.style.width = "100%";
        }

        break;

      case "Ctrl_Clear":
        new_Element.type = "button";
        new_Element.innerHTML = "X";
        break;
        
    }

    return new_Element;
   
  },

  Element_Declare(f_ELEMENT){ 

    if(cst.PROPS[f_ELEMENT].qs_all === undefined){
      
      glb.ELEMENTS[glb.ID.qs][f_ELEMENT] = document.querySelector(`#${glb.ID.qs} ${cst.PROPS[f_ELEMENT].selector}`) ?? false;

    }
    else{
    
      glb.ELEMENTS[glb.ID.qs][f_ELEMENT] = document.querySelectorAll(`#${glb.ID.qs} ${cst.PROPS[f_ELEMENT].selector}`) ?? false;

    }

  },

  qs(f_ELEMENT){ return glb.ELEMENTS[glb.ID.qs][f_ELEMENT]; },

  /* ---------- ---------- ---------- ---------- ---------- */

  Main(f_EVT){

    let vClass = f_EVT.target.className.split(" ")[0];

    if(! cst.ALLOWED_LISTENERS.includes(vClass)){ return false; }
      
    if(vClass == cst.PROPS.Toggle.class_name){ glb.ID.Last_Clicked = f_EVT.target.parentNode.id; }

    if(glb.ID.Last_Clicked === "INI"){ return false; }

    glb.ID.qs = glb.ID.Last_Clicked;

    switch(vClass){
    
      case cst.PROPS.Toggle.class_name:
        this.Container_Visibility();
        break;
       
      case cst.PROPS.Ctrl_Selection.class_name:
        this.Listitem_Selection();
        break;
        
      case cst.PROPS.Ctrl_Search.class_name:
        this.Search_on_List();
        break;
        
      case cst.PROPS.Ctrl_Clear.class_name:
        this.Search_Clear();
        this.Search_on_List();
        break;
        
      case cst.PROPS.List_Item.class_name:
        this.Change_iHTML();
        break;

      default:
        alert("Err: K20");
        break;
        
    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Container_Visibility(){ 

    this.Container_Reposition();
    this.qs("Container").style.display = (this.qs("Container").style.display === "none") ? "flex" : "none";

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Change_iHTML(){

    let rPrint = [];
    let rListitem_Info = this.Listitem_Info();

    if(rListitem_Info.count === 0){ 

      rPrint.toggle = "Selected ( 0 )";
      rPrint.ctrl_selection = "ALL";
      this.qs("Toggle").classList.add(cst.PROPS.Toggle.class_name_ext);

    }
    else{ 

      rPrint.toggle = "All Selected";
      rPrint.ctrl_selection = "RESET";
      this.qs("Toggle").classList.remove(cst.PROPS.Toggle.class_name_ext);

    }

    if(rListitem_Info.count !== 0 && rListitem_Info.count !== this.qs("List_Item").length){

      if(rListitem_Info.count > 5 || glb.SETTINGS[glb.ID.qs].onlySelectedCounter.STTNG){

        rPrint.toggle  = `Selected ( ${rListitem_Info.count} )`;

      }
      else{

        rPrint.toggle = rListitem_Info.checked_items.slice(0,5).join(', ');

        rPrint.toggle = (rPrint.toggle.length <= 50) ? rPrint.toggle : `${rPrint.toggle.substring(0,50)} ...`;
        
      }

    }
    
    this.qs("Toggle").innerHTML = rPrint.toggle;

    if(this.qs("Ctrl_Selection")){ this.qs("Ctrl_Selection").innerHTML = rPrint.ctrl_selection; }

  },

  Listitem_Info(){

    let rInfo__Return = [];
    rInfo__Return.count = 0;
    rInfo__Return.checked_items = [];

    this.qs("List_Item").forEach(fe_Item =>{

      if(fe_Item.checked === true){ 

        rInfo__Return.count++;
        rInfo__Return.checked_items.push(fe_Item.value); 

      } 

    });

    rInfo__Return.status = (rInfo__Return.count == 0) ? true : false;

    return rInfo__Return;

  },

  Listitem_Selection(){

    if(! glb.SETTINGS[glb.ID.qs].singleSelectMode.STTNG){

      let vStatus = this.Listitem_Info().status;

      this.qs("List_Item").forEach(fe_Item =>{ fe_Item.checked = vStatus; });

      this.Change_iHTML();

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Search_on_List(){

    let rSearch = [];
    rSearch.to_lower = this.qs("Ctrl_Search").value.toLowerCase();
    rSearch.count_notfound = 0;

    this.Ctrl_Clear_Display();

    for(let i = 0; i < this.qs("List_Item").length; i++){

      if(this.qs("List_Item")[i].value.toLowerCase().indexOf(rSearch.to_lower) == -1){

        this.qs("ULLI")[i].style.display = "none";

        rSearch.count_notfound++;

      }
      else{

        this.qs("ULLI")[i].style.display = "";

      }

      (rSearch.count_notfound == this.qs("List_Item").length) ? this.qs("Ctrl_Search").classList.add(cst.PROPS.Ctrl_Search.class_name_ext) : this.qs("Ctrl_Search").classList.remove(cst.PROPS.Ctrl_Search.class_name_ext);

    }

  },

  Search_Clear(){ this.qs("Ctrl_Search").value = ""; },

  Ctrl_Clear_Display(){ this.qs("Ctrl_Clear").style.display = (this.qs("Ctrl_Search").value.length === 0) ? "none" : "inline-block"; },

  /* ---------- ---------- ---------- ---------- ---------- */

  Listitem_Selection_on_Contextmenu(f_EVT){

    if(f_EVT.target.className.split(" ")[0] == cst.PROPS.Toggle.class_name){

      glb.ID.qs = f_EVT.target.parentNode.id;

      f_EVT.preventDefault();
      this.Listitem_Selection();
      return false;

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Close_All_Containers_Clicking_Outside(f_EVT){

    if(! (f_EVT.type === "touchstart" && f_EVT.target.className === cst.PROPS.Toggle.class_name)){

      document.querySelectorAll(cst.PROPS.Container.selector).forEach(fe_Container =>{

        if(f_EVT.target.closest(cst.PROPS.Container.selector) === null && f_EVT.target.parentNode.id !== glb.ID.Last_Clicked){ fe_Container.style.display = "none"; }

      });

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Container_Reposition(){ 

    if(glb.ID.Last_Clicked !== "INI"){

      let rPos = [];

      rPos.max_width = window.innerWidth;
      rPos.toggle_left = this.qs("Toggle").getBoundingClientRect().left;
      rPos.overflow_check = this.qs("Toggle").getBoundingClientRect().left + parseInt(glb.SETTINGS[glb.ID.Last_Clicked].containerWidth.STTNG);

      rPos.set_normal = rPos.toggle_left + "px";
      rPos.set_responsive = ((window.innerWidth - parseInt(glb.SETTINGS[glb.ID.Last_Clicked].containerWidth.STTNG)) - 10) + "px";

      this.qs("Container").style.left = (rPos.overflow_check < rPos.max_width) ? rPos.set_normal : rPos.set_responsive;

    }

  }

};


/* ---------- ---------- ---------- ---------- ---------- */

window.addEventListener("click", function(){ kSDL.Close_All_Containers_Clicking_Outside(event); kSDL.Main(event); });

window.addEventListener("touchstart", function(){ kSDL.Close_All_Containers_Clicking_Outside(event); });

window.addEventListener("contextmenu", function(){ kSDL.Listitem_Selection_on_Contextmenu(event); });

window.addEventListener("keyup", function(){ kSDL.Main(event); });

window.addEventListener("resize", function(){ kSDL.Container_Reposition(); });

/*

-- kSDL v2023.0722 --

https://appnexa.net/dev/kSDL/

by Ivo Rubim

page: https://appnexa.net/dev/ivorubim/ 
contact: rubim.ivo@gmail.com

*/