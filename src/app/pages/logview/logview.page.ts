import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-logview',
  templateUrl: './logview.page.html',
  styleUrls: ['./logview.page.scss'],
})
export class LogviewPage implements OnInit {


  @Input() logs: [LogEntry] = [{ text: "", extra: "" }]
  open: any[]
  openAll = false

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.logs) this.open = new Array(this.logs.length)
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  formatLog(log) {

    if (log.startsWith("[ERROR]")) return "error"
    else if(log.startsWith(": Error:")) return "error"
    else if (log.startsWith("[WARN]")) return "warn"
    else if (log.startsWith("[LOG]")) return "log"
    else if (log.startsWith("[INFO]")) return "info"
    return ""
  }

  openExtra(index) {
    this.open[index] = !this.open[index]
  }

  expandAll() {
    this.openAll = !this.openAll
  }

  copyToClipboard() {
    var result = ""
    this.logs.forEach(data => {
      result += data.text +"\n"+data.extra
    })
    navigator.clipboard.writeText(result);
    Toast.show({
      text: 'Copied to clipboard'
    });
  }

}

interface LogEntry {
  text: string
  extra: string
}