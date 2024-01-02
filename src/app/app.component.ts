import { Component, ViewChild, Input, OnInit, AfterViewInit } from '@angular/core';
import { IPColumnStyle } from 'ip-grid';
import { IPColumn } from 'ip-grid';
import { IPColumnState } from 'ip-grid';
import { IpGridComponent } from 'ip-grid';
import { IPGInterface } from 'ip-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'ip-grid';
  @ViewChild('ip-grid') grid:IpGridComponent;
  searchField = "";
  searchValue = "";

  _gridInterface: IPGInterface;
  setGridInterface(value: IPGInterface){
    this._gridInterface = value;
  }
  get gridInterface() {
    return this._gridInterface;
  }

 columns: IPColumn[] = [
    {width: 130, height: 20, field: "col1", text: "first column", sort: 0, align: 'left', locked: true},
    {width: 150, height: 20, field: "col2", text: "second column", sort: 0, align: 'left', locked: true},
    {width: 150, height: 20, field: "col3", size: false, move: false, text: "third column", sort: 0, sortType: 'image'},
    {width: 150, height: 20, field: "col4", text: "fourth column", sort: 0, sortType: "string"},
    {width: 150, height: 20, field: "col5", text: "fifth column", sort: 0},
    {width: 140, height: 20, field: "col6", text: "sixth column", sort: 0, hide: true},
    {width: 130, height: 20, field: "col7", text: "first column", sort: 0, align: 'left', locked: true},
    {width: 150, height: 20, field: "col8", text: "second column", sort: 0, align: 'left', locked: true},
    {width: 150, height: 20, field: "col9", size: false, move: false, text: "third column", sort: 0, sortType: 'image'},
    {width: 150, height: 20, field: "col10", text: "fourth column", sort: 0, sortType: "string"},
  ];

  colStyle: IPColumnStyle[] = [
    {field: "col1", padLeft: '14px', hdrBG: "url('./assets/testimage.png'", hdrColor: "white"},
    {field: "col2", wrap: true, padLeft: "3px", hdrBG: "#77F", hdrColor: "white"},
    {field: "col3", fontSize: '12pt', cellFontsize: '12pt', selBG: 'red', selColor: 'white'},
    {field: "col4", background: 'green', color: "white"},
    {field: "col5" },
    {field: "col6"},
    {field: "col7", padLeft: '14px', hdrBG: "url('./assets/testimage.png'", hdrColor: "white"},
    {field: "col8", wrap: true, padLeft: "3px", hdrBG: "#77F", hdrColor: "white"},
    {field: "col9", fontSize: '12pt', cellFontsize: '12pt', selBG: 'red', selColor: 'white'},
    {field: "col10", background: 'green', color: "white"},
  ];

  data: any[];

  ngOnInit(): void {    
    let test = localStorage.getItem( "searchField");
    this.searchField = test ? test : "";
    test = localStorage.getItem( "searchValue");
    this.searchValue = test ? test : "";
  }
  
  ngAfterViewInit(){
    
    // this.gridInterface.setHdrFontsize("30pt");
    this.gridInterface.setHdrHeight("1.5em");
    this.gridInterface.addColumns(this.columns);
    this.gridInterface.setColumnStyle(this.colStyle);
    // this.gridInterface.setColBorderStyle("dashed 5px red");
    this.setData();
   
  }

  search(e: MouseEvent){

    let rows = this.gridInterface.searchRows(this.searchField, this.searchValue);

    this.gridInterface.setSearchData(rows);

    // for (var i = 0; i < rows.length; i++) {
    //   rows[i][this.searchField] = "toots";
    // }

    this.gridInterface.refresh();

    localStorage.setItem( "searchField", this.searchField);
    localStorage.setItem( "searchValue", this.searchValue);
  }

  selField: string;
  selValue: string;
  select(e: MouseEvent){
    let rows = this.gridInterface.setSelected(this.selField, this.selValue);

    this.gridInterface.refresh();

    localStorage.setItem( "selField", this.selField);
    localStorage.setItem( "selValue", this.selValue);
  }


  reset(e: MouseEvent){
    this.gridInterface.resetData();
    this.gridInterface.refresh();
  }

  append(e: MouseEvent) {
    let i = 7;
    let r = Math.random();
    let text = "soap";
    let text3 = i % 3 == 0 ? "zero" : i % 3 == 1 ? "one" : "two";
    this.gridInterface.append({ col1: i + ": 111", col2: text, col3 : text3, col4: r + ": 444", col5: i + ": 555", col6: i + ": 666", col7: i + ": 777" });

  }

  delete(e: MouseEvent){
    this.gridInterface.delete( this.searchField, this.searchValue);
  }

  deleteSelected(e: MouseEvent){
    this.gridInterface.deleteSelected();
  }

  groupField = "";
  group(e: MouseEvent, action:"set" | "add" | "remove" | "end") {
    this.gridInterface.group(this.groupField, action);
  }

  
  dataCount = 20;
  setData(e?:MouseEvent) {
    this.data = [];

    for (var i = 0; i < this.dataCount; i++) {
      let text = "soap";
      let text3 = "../assets/testimage.png"; //i % 3 == 0 ? "zero" : i % 3 == 1 ? "one" : "two";
      let text2 = "This is a really long piece of text";
      let text4 = i % 3 == 0 ? "zero" : i % 3 == 1 ? "one" : "two";
      this.data.push({ col1: i + ": 111", col2: text2, col3 : text3, col4: text4, col5: i + ": 555", col6: i + ": 666", col7: i + ": 777", col9: "../assets/testimage.png" });
    }

    this.gridInterface.setData(this.data);
  }

  openDlg(event: MouseEvent){
      let parent = <HTMLDivElement>document.getElementById("grid-div");      
      this.gridInterface.showColumnsDlg();
  }

  hdrHeight = "3em";
  setHdrHeight(event: MouseEvent){
    this.gridInterface.setHdrHeight( this.hdrHeight );
  }
  rowHeight = "3em";
  setRowHeight(event: MouseEvent){
    this.gridInterface.setRowHeight( this.rowHeight );
  }

  grpBG = "white";
  setGrpBG(event:MouseEvent){
    this.gridInterface.setGrpBG(this.grpBG);
    this.gridInterface.refresh();
  }

  grpClr = "white";
  setGrpColor(event:MouseEvent){
    this.gridInterface.setGrpColor(this.grpClr);
    this.gridInterface.refresh();
  }

  colStateChange(cs:IPColumnState){
    localStorage.setItem( "col-state", JSON.stringify(cs));
  }

  updateColState(){
    let test = localStorage.getItem( "col-state");
    if (test){
      this.gridInterface.setColumnState(JSON.parse(test));
    }
  }
}
