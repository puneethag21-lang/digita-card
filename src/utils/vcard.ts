import { CONTACT_INFO } from '../constants/translations';

export function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${CONTACT_INFO.driverName} (Auto Kundapura)`,
    `N:;${CONTACT_INFO.driverName};;;`,
    `TEL;TYPE=CELL,VOICE:${CONTACT_INFO.phoneInternational}`,
    `TEL;TYPE=WORK,VOICE:${CONTACT_INFO.phone}`,
    `TITLE:Auto Rickshaw Driver`,
    `ORG:ZEO Cards - Transport Services`,
    `ADR;TYPE=WORK:;;Goliyangadi;Kundapura;Karnataka;576201;India`,
    `NOTE:Reliable rides across Kundapura-Udupi. Local and outstation auto service. TVS Duramax.`,
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Ganapathi_Auto_Kundapura.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
