initCookie();

function initCookie() {
    document.cookie = 'current={"voornaam": {"nl": "Voornaam", "en": ""}, "achternaam": {"nl": "Achternaam", "en": ""}, "geslacht": {"nl": "Geslacht", "en": ""}, "straat": {"nl": "Straat", "en": ""}, "huisnummer": {"nl": "Huisnummer", "en": ""}, "toevoeging": {"nl": "Toevoeging", "en": ""}, "postcode": {"nl": "Postcode", "en": ""}, "woonplaats": {"nl": "Woonplaats", "en": ""}, "land": {"nl": "Land", "en": ""}, "rekeningnummer": {"nl": "Bank/giro rekeningnummer", "en": ""} }';
    document.cookie = 'pending={"voornaam": {"nl": "Voornaam", "en": "", "message": ""}, "achternaam": {"nl": "Achternaam", "en": "", "message": ""}, "geslacht": {"nl": "Geslacht", "en": "", "message": ""}, "straat": {"nl": "Straat", "en": "", "message": ""}, "huisnummer": {"nl": "Huisnummer", "en": "", "message": ""}, "toevoeging": {"nl": "Toevoeging", "en": "", "message": ""}, "postcode": {"nl": "Postcode", "en": "", "message": ""}, "woonplaats": {"nl": "Woonplaats", "en": "", "message": ""}, "land": {"nl": "Land", "en": "", "message": ""}, "rekeningnummer": {"nl": "Bank/giro rekeningnummer", "en": "", "message": ""} }';
    document.cookie = 'field=voornaam';
}

function getField() {
    var split = document.cookie.split(';');
    for (var i = 0; i < split.length; i++) {
        if (split[i].trim()[0] == 'f') {
            return split[i].replace("field=", "");
        }
    }
    alert("BAD");
}

function getCurrent() {
    var split = document.cookie.split(';');
    for (var i = 0; i < split.length; i++) {
        if (split[i].trim()[0] == 'c') {
            return split[i].replace("current=", "");
        }
    }
    alert("BAD");
}

function getPending() {
    var split = document.cookie.split(';');
    for (var i = 0; i < split.length; i++) {
        if (split[i].trim()[0] == 'p') {
            return split[i].replace("pending=", "");
        }
    }
    alert("BAD");
}

function processValueChange(el) {
    var field = getField();
    var nl = document.getElementById("nl");
    var en = document.getElementById("en");
    var message = document.getElementById("message");

    var pending = JSON.parse(getPending());
    pending.voornaam.nl = nl.value;
    pending.voornaam.en = en.value;
    pending.voornaam.message = message.value;
    document.cookie = `pending=${JSON.stringify(pending)}`;

    var current = JSON.parse(getCurrent());

    var requestChangesButton = document.getElementById("request");
    requestChangesButton.disabled = nl.value == current.voornaam.nl && en.value == current.voornaam.en;
} 

function discardChanges(el) {
    var field = getField();
    var nl = document.getElementById("nl");
    var en = document.getElementById("en");

    var current = JSON.parse(getCurrent());
    var pending = JSON.parse(getPending());

    pending.voornaam.message = "";
    pending.voornaam.nl = current.voornaam.nl;
    pending.voornaam.en = current.voornaam.en;
    document.cookie = `pending=${JSON.stringify(pending)}`;
    var message = document.getElementById("message");
    message.value = "";

    nl.value = current.voornaam.nl;
    en.value = current.voornaam.en;

    var requestChangesButton = document.getElementById("request");
    requestChangesButton.disabled = true;
}

function requestChanges(el) {
    var field = getField();
    var pending = JSON.parse(getPending());

    var current = JSON.parse(getCurrent());
    var pending = JSON.parse(getPending());

    current.voornaam.nl = pending.voornaam.nl;
    current.voornaam.en = pending.voornaam.en;

    pending.voornaam.message = "";

    document.cookie = `current=${JSON.stringify(current)}`;
    document.cookie = `pending=${JSON.stringify(pending)}`;

    var message = document.getElementById("message");
    message.value = "";

    el.disabled = true;

    //var json = JSON.parse(document.cookie.replace("values=", ""));

    //var xhr = new XMLHttpRequest();
    //xhr.open("POST", "http://localhost:8080/requestChanges", true);

    //var data = "";

    //if (field == "voornaam") {
        //data = `{"name": "Voornaam", "entity": Persoon, "questionText": {"nl": "${json.voornaam.nl}", "en": "${json.voornaam.en}"}}`;
    //} else if (field == "achternaam") {
        //data = `{"name": "Achternaam", "entity": Persoon, "questionText": {"nl": "${json.achternaam.nl}", "en": "${json.achternaam.en}"}}`;
    //}

    //xhr.send(data);
}
    
    
function devtoolsSelect(el) {
    var selected = document.getElementsByClassName("devtools-selected");
    if (selected.length != 0) {
        selected[0].classList.remove("devtools-selected");
    }
    el.classList.add("devtools-selected");

    var bar = document.getElementById("bar").contentWindow.document;
    var body = bar.getElementsByTagName("body")[0];

    //var field = el.id;
    var fieldBody = templateBody.replaceAll("$Field", "Voornaam").replace("$field", "voornaam");
    //if (field == "rekeningnummer") {
        //fieldBody = templateBody.replaceAll("$Field", "BankGiroRekeningNummer").replace("$field", field);
    //}

    body.innerHTML = fieldBody; 
    //document.cookie = `field=${field}`;


    var requestChangesButton = bar.getElementById("request");

    var nl = bar.getElementById("nl");
    var en = bar.getElementById("en");
    var message = bar.getElementById("message");

    var pending = JSON.parse(getPending());
    var current = JSON.parse(getCurrent());

    nl.value = pending.voornaam.nl; 
    en.value = pending.voornaam.en; 
    message.value = pending.voornaam.message;

    requestChangesButton.disabled = pending.voornaam.nl == current.voornaam.nl && pending.voornaam.en == current.voornaam.en;
}

function devtoolsHover(el) {
    el.classList.add("devtools-element-target");
}

function devtoolsLeave(el) {
    el.classList.remove("devtools-element-target");
}

var templateBody = 
`
<dt-root ng-version="16.1.6">
  <dt-layout>
    <div class="flex flex-row h-screen ng-star-inserted">
      <dt-toolbar _nghost-ng-c2441343542="">
        <div _ngcontent-ng-c2441343542="" class="flex flex-col overflow-hidden h-full transform transition-width w-screen">
          <div _ngcontent-ng-c2441343542="" class="header-actions flex flex-row flex-wrap flex-shrink-0 items-center h-12">
            <button _ngcontent-ng-c2441343542="" bq-icon-button="" class="m-0 bq-button-base ng-star-inserted">
              <span tabindex="-1">
                <bq-icon _ngcontent-ng-c2441343542="" icon="double-arrow-right" class="block transform transition-none bq-icon ng-star-inserted" style="height: 1.4rem; width: 1.4rem;">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fit="" preserveAspectRatio="xMidYMid meet" fill="currentColor" focusable="false">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M13.5 5H11l5 7-5 7h2.5l5-7z"></path>
                      <path d="M8.5 5H6l5 7-5 7h2.5l5-7z"></path>
                    </svg>
                  </div>
                </bq-icon>
              </span>
            </button>
            <bq-tooltip class="ng-tns-c794289210-9 hidden ng-star-inserted">
            </bq-tooltip>
            <button _ngcontent-ng-c2441343542="" bq-icon-button="" class="m-0 bq-button-base">
              <span tabindex="-1">
                <bq-icon _ngcontent-ng-c2441343542="" icon="select-highlight" class="bq-icon text-primary" style="height: 1.4rem; width: 1.4rem;">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="100%" height="100%" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M17 5h-2V3h2v2zm2-2v2h2V3h-2zm0 6h2V7h-2v2zm0 4h2v-2h-2v2zm-8 8h2v-2h-2v2zM7 5h2V3H7v2zM3 5h2V3H3v2zm0 12h2v-2H3v2zm0 4h2v-2H3v2zm8-16h2V3h-2v2zM3 9h2V7H3v2zm4 12h2v-2H7v2zm-4-8h2v-2H3v2zm12 2v6l2.29-2.29 2.3 2.29L21 19.59l-2.29-2.29L21 15h-6z"></path>
                    </svg>
                  </div>
                </bq-icon>
              </span>
            </button>
            <bq-tooltip class="ng-tns-c794289210-0 hidden ng-star-inserted">
            </bq-tooltip>
            <bq-form-field _ngcontent-ng-c2441343542="" appearance="compact" class="hide-on-collapsed-x flex-1 max-w-xs compact ng-star-inserted" _nghost-ng-c2798898945="">
              <div _ngcontent-ng-c2798898945="" class="mb-5 relative">
                <div _ngcontent-ng-c2798898945="" class="form-field-wrapper h-stack relative w-full bg-application-field border-b outline-none rounded-none box-border pl-3 border-application-separator">
                  <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mr-2"></div>
                  <div _ngcontent-ng-c2798898945="" class="h-item-fill relative">
                    <label _ngcontent-ng-c2798898945="" color-position="text" class="absolute mb-0 -mt-2 pt-4 left-0 top-0 z-10 leading-tight cursor-text pointer-events-none select-none duration-friendly truncate w-full opacity-subtext -mt-6 text-xs ng-star-inserted" for="bq-field-2" aria-owns="bq-field-2">
                      <bq-label _ngcontent-ng-c2441343542="">Active session</bq-label>
                    </label>
                    <select _ngcontent-ng-c2441343542="" bq-input="" id="bq-field-2" class="ng-untouched ng-pristine ng-valid">
                      <option _ngcontent-ng-c2441343542="" value="0: Object" class="ng-star-inserted"> Main </option>
                    </select>
                  </div>
                  <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mx-2">
                  </div>
                </div>
                <div _ngcontent-ng-c2798898945=""></div>
              </div>
            </bq-form-field>
            <span class="contents">
              <button _ngcontent-ng-c2441343542="" bq-icon-button="" bq-tooltip="Reload project" class="m-0 bq-button-base ng-star-inserted">
                <span tabindex="-1">
                  <bq-icon _ngcontent-ng-c2441343542="" icon="reload" class="bq-icon ng-star-inserted" style="height: 1.4rem; width: 1.4rem;">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path>
                      </svg>
                    </div>
                  </bq-icon>
                </span>
              </button>
            </span>
            <bq-tooltip class="ng-tns-c794289210-17 hidden ng-star-inserted">
            </bq-tooltip>
            <div _ngcontent-ng-c2441343542="" class="m-0 ml-auto">
              <button _ngcontent-ng-c2441343542="" bq-icon-button="" bq-tooltip="Customize toolbar" class="m-0 bq-button-base ng-star-inserted">
                <span tabindex="-1">
                  <bq-icon _ngcontent-ng-c2441343542="" icon="menu" class="bq-icon" style="height: 1.4rem; width: 1.4rem;">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="100%" height="100%" fit="" preserveAspectRatio="xMidYMid meet" fill="currentColor" focusable="false">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                      </svg>
                    </div>
                  </bq-icon>
                </span>
              </button>
              <bq-tooltip class="ng-tns-c794289210-21 hidden ng-star-inserted">
              </bq-tooltip>
              <bq-menu _ngcontent-ng-c2441343542="" class="ng-tns-c4133805913-10 ng-star-inserted">
              </bq-menu>
              <button _ngcontent-ng-c2441343542="" bq-icon-button="" bq-tooltip="Close toolbar" class="m-0 bq-button-base ng-star-inserted">
                <span tabindex="-1">
                  <bq-icon _ngcontent-ng-c2441343542="" icon="close" class="bq-icon" style="height: 1.4rem; width: 1.4rem;">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fit="" preserveAspectRatio="xMidYMid meet" fill="currentColor" focusable="false">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                      </svg>
                    </div>
                  </bq-icon>
                </span>
              </button>
              <bq-tooltip class="ng-tns-c794289210-11 hidden ng-star-inserted">
              </bq-tooltip>
            </div>
          </div>
          <div _ngcontent-ng-c2441343542="" class="flex flex-grow overflow-y-auto hide-on-collapsed">
            <bq-tabs _ngcontent-ng-c2441343542="" class="w-full">
              <div class="relative overflow-hidden flex flex-col w-full h-full max-w-full p-0 m-0">
                <div class="flex flex-row flex-shrink-0 flex-wrap justify-start overflow-hidden">
                  <div tabindex="1" class="bq-tab-header ng-star-inserted">
                    <span bq-tooltip="" truncate="" class="truncate">Profile</span> 
                    <bq-tooltip class="ng-tns-c794289210-12 hidden ng-star-inserted">
                    </bq-tooltip>
                    <div bq-tooltip="" truncate="" class="pill truncate"></div>
                    <bq-tooltip class="ng-tns-c794289210-13 hidden ng-star-inserted">
                    </bq-tooltip>
                  </div>
                  <div tabindex="1" class="bq-tab-header ng-star-inserted active">
                    <span bq-tooltip="" truncate="" class="truncate">Element</span> 
                    <bq-tooltip class="ng-tns-c794289210-14 hidden ng-star-inserted">
                    </bq-tooltip>
                    <div bq-tooltip="" truncate="" class="pill truncate"></div>
                    <bq-tooltip class="ng-tns-c794289210-15 hidden ng-star-inserted">
                    </bq-tooltip>
                  </div>
                </div>
                <bq-tab _ngcontent-ng-c2441343542="" label="Profile" class="overflow-hidden top-0 left-0 right-0 bottom-0 block">
                  <div class="h-full overflow-auto" id="0" hidden="">
                  </div>
                </bq-tab>
                <bq-tab _ngcontent-ng-c2441343542="" label="Element" class="overflow-hidden top-0 left-0 right-0 bottom-0 block relative overflow-x-hidden overflow-y-auto flex-grow z-10">
                  <div class="h-full overflow-auto" id="1">
                    <dt-element-explorer _ngcontent-ng-c2441343542="" class="ng-star-inserted">
                      <div class="m-4">
                        <div class="flex flex-row flex-wrap items-center">
                          <span id ="name-underline" class="underline cursor-pointer hover:text-primary ng-star-inserted">Verzekerde.$Field</span><!----> 
                        </div>
                        <h2 id="name-header" class="ng-star-inserted">Verzekerde.$Field (Field)</h2>
                        <table class="table-fixed w-full ng-star-inserted">
                          <tr class="ng-star-inserted">
                            <td class="truncate w-1/3">
                              <span class="font-medium">QuestionText</span> 
                              <bq-tooltip class="ng-tns-c794289210-35 hidden ng-star-inserted">
                              </bq-tooltip>
                            </td>
                            <td class="break-all">
                              <dt-element-property>
                                <div class="flex flex-row ng-star-inserted">
                                  <div style="margin: 5px 0">
                                    <bq-form-field _nghost-ng-c2798898945="">
                                      <div _ngcontent-ng-c2798898945="" class="mb-5 relative">
                                        <div _ngcontent-ng-c2798898945="" class="form-field-wrapper h-stack relative w-full bg-application-field border-b outline-none rounded-none box-border pl-3 border-application-separator">
                                          <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mr-2"></div>
                                          <div _ngcontent-ng-c2798898945="" class="h-item-fill relative">
                                            <label _ngcontent-ng-c2798898945="" color-position="text" class="absolute mb-0 -mt-2 pt-4 left-0 top-0 z-10 leading-tight cursor-text pointer-events-none select-none duration-friendly truncate w-full ng-star-inserted -mt-6 text-xs opacity-subtext" for="bq-field-1" aria-owns="bq-field-1" style="">
                                              <bq-label>nl-NL</bq-label>
                                            </label>
                                            <input bq-input="" value="$Field" class="ng-pristine ng-valid ng-touched $field" id="nl" onkeyup="processValueChange(this)">
                                          </div>
                                          <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mx-2"></div>
                                        </div>
                                        <div _ngcontent-ng-c2798898945=""></div>
                                      </div>
                                    </bq-form-field>
                                  </div>
                                  <bq-tooltip class="ng-tns-c794289210-46 hidden ng-star-inserted"></bq-tooltip>
                                </div>
                                <div class="flex flex-row ng-star-inserted">
                                  <div style="margin: tpx 0">
                                    <bq-form-field _nghost-ng-c2798898945="">
                                      <div _ngcontent-ng-c2798898945="" class="mb-5 relative">
                                        <div _ngcontent-ng-c2798898945="" class="form-field-wrapper h-stack relative w-full bg-application-field border-b outline-none rounded-none box-border pl-3 border-application-separator">
                                          <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mr-2"></div>
                                          <div _ngcontent-ng-c2798898945="" class="h-item-fill relative">
                                            <label _ngcontent-ng-c2798898945="" color-position="text" class="absolute mb-0 -mt-2 pt-4 left-0 top-0 z-10 leading-tight cursor-text pointer-events-none select-none duration-friendly truncate w-full ng-star-inserted -mt-6 text-xs opacity-subtext" for="bq-field-1" aria-owns="bq-field-1" style="">
                                              <bq-label>en-GB</bq-label>
                                            </label>
                                            <input bq-input="" value="" class="ng-pristine ng-valid ng-touched $field" id="en" onkeyup="processValueChange(this)">
                                          </div>
                                          <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mx-2"></div>
                                        </div>
                                        <div _ngcontent-ng-c2798898945=""></div>
                                      </div>
                                    </bq-form-field>
                                  </div>
                                  <bq-tooltip class="ng-tns-c794289210-47 hidden ng-star-inserted"></bq-tooltip>
                                </div>
                              </dt-element-property>
                            </td>
                          </tr>
                        </table>
                        <div style="margin-top: 20px">
                          <bq-form-field _nghost-ng-c2798898945="">
                            <div _ngcontent-ng-c2798898945="" class="mb-5 relative">
                              <div _ngcontent-ng-c2798898945="" class="form-field-wrapper h-stack relative w-full bg-application-field border-b outline-none rounded-none box-border pl-3 border-application-separator">
                                <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mr-2"></div>
                                <div _ngcontent-ng-c2798898945="" class="h-item-fill relative">
                                  <label _ngcontent-ng-c2798898945="" color-position="text" class="absolute mb-0 -mt-2 pt-4 left-0 top-0 z-10 leading-tight cursor-text pointer-events-none select-none duration-friendly truncate w-full ng-star-inserted -mt-6 text-xs opacity-subtext" for="bq-field-1" aria-owns="bq-field-1" style="">
                                    <bq-label>Message</bq-label>
                                  </label>
                                    <input bq-input="" value="" placeholder="Ex. typo fixed" class="ng-pristine ng-valid ng-touched $field" id="message" onkeyup="processValueChange(this)">
                                </div>
                                <div _ngcontent-ng-c2798898945="" class="empty:hide flex self-center items-center mx-2"></div>
                              </div>
                              <div _ngcontent-ng-c2798898945=""></div>
                            </div>
                          </bq-form-field>
                          <div class="flex justify-end">
                            <button bq-button="" color="primary" class="bq-button-base bq-primary $field" onclick="discardChanges(this)"><span tabindex="-1">Discard</span></button>
                            <button bq-button="" color="primary" class="bq-button-base bq-primary $field" id="request" disabled onclick="requestChanges(this)"><span tabindex="-1">Request Changes</span></button>
                          </div>
                        </div>
                      </div>
                    </dt-element-explorer>
                  </div>
                </bq-tab>
              </div>
            </bq-tabs>
          </div>
        </div>
      </dt-toolbar>
    </div>
  </dt-layout>
</dt-root>
<div class="cdk-overlay-container"></div>
`
