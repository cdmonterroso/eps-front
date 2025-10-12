export interface ActividadDetalleInterface{
  "id": number,
  "fullname": string,
  "displayname": string,
  "shortname": "EDD",
  "categoryid": number,
  "categoryname": string,
  "sortorder": number,
  "summary": "",
  "summaryformat": number,
  "summaryfiles": [],
  "overviewfiles": [],
  "showactivitydates": boolean,
  "showcompletionconditions": boolean,
  "contacts": [
    {
      "id": number,
      "fullname": string
    }
  ],
  "enrollmentmethods": [],
  "idnumber": string,
  "format": string,
  "showgrades": number,
  "newsitems": number,
  "startdate": number,
  "enddate": number,
  "maxbytes": number,
  "showreports": number,
  "visible": number,
  "groupmode": number,
  "groupmodeforce": number,
  "defaultgroupingid": number,
  "enablecompletion": number,
  "completionnotify": number,
  "lang": string,
  "theme": string,
  "marker": number,
  "legacyfiles": number,
  "calendartype": string,
  "timecreated": number,
  "timemodified": number,
  "requested": number,
  "cacherev": number,
  "filters": [
    {
      "filter": string,
      "localstate": number,
      "inheritedstate": number
    },
    {
      "filter": string,
      "localstate": number,
      "inheritedstate": number
    },
    {
      "filter": string,
      "localstate": number,
      "inheritedstate": number
    },
    {
      "filter": string,
      "localstate": number,
      "inheritedstate": number
    },
    {
      "filter": string,
      "localstate": number,
      "inheritedstate": number
    },
    {
      "filter": string,
      "localstate": number,
      "inheritedstate": number
    }
  ],
  "courseformatoptions": [
    {
      "name": string,
      "value": number
    },
    {
      "name": string,
      "value": number
    },
    {
      "name": string,
      "value": string
    }
  ]
}
