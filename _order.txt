// ── CREATE ORDER SCREEN ──────────────────────────────────────
function CreateOrderScreen({ onBack, onSubmit }) {
  // Sender
  const [sNama,      setSNama]      = React.useState('');
  const [sPanggilan, setSPanggilan] = React.useState('');
  const [sIC,        setSIC]        = React.useState('');
  const [sPhone,     setSPhone]     = React.useState('');
  const [sPhone2,    setSPhone2]    = React.useState('');
  const [sAlamat,    setSAlamat]    = React.useState('');
  const [sBandar,    setSBandar]    = React.useState('');
  const [sNegeri,    setSNegeri]    = React.useState('');
  // Parcel
  const [berat,      setBerat]      = React.useState('');
  const [jumlah,     setJumlah]     = React.useState('');
  const [saiz,       setSaiz]       = React.useState('Small');
  const [lokasi,     setLokasi]     = React.useState('');
  const [casTambah,  setCasTambah]  = React.useState('0');
  const [agent,      setAgent]      = React.useState('');
  const [keterangan, setKeterangan] = React.useState('');
  // Recipient
  const [rNama,      setRNama]      = React.useState('');
  const [rPanggilan, setRPanggilan] = React.useState('');
  const [rIC,        setRIC]        = React.useState('');
  const [rPhone,     setRPhone]     = React.useState('');
  const [rPhone2,    setRPhone2]    = React.useState('');
  const [rAlamat,    setRAlamat]    = React.useState('');
  const [rRTRW,      setRRTRW]      = React.useState('');
  const [rDusun,     setRDusun]     = React.useState('');
  const [rKelurahan, setRKelurahan] = React.useState('');
  const [rKecamatan, setRKecamatan] = React.useState('');
  const [rKabupaten, setRKabupaten] = React.useState('');
  const [rProvinsi,  setRProvinsi]  = React.useState('');
  const [rPostal,    setRPostal]    = React.useState('');
  const [rNegara,    setRNegara]    = React.useState('MALAYSIA');
  // Payment
  const [bayaran,    setBayaran]    = React.useState('');
  const [photoTaken, setPhotoTaken] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [step,       setStep]       = React.useState(0); // 0=pengirim 1=penerima 2=payment

  const iStyle = {
    width: '100%', boxSizing: 'border-box',
    background: T.navyDark, border: `1.5px solid ${T.navyBorder}`,
    borderRadius: 10, padding: '11px 12px',
    fontFamily: F.family, fontSize: 13, color: T.white, outline: 'none',
  };
  const selStyle = { ...iStyle, appearance: 'none', cursor: 'pointer' };
  const labelStyle = { fontFamily: F.family, fontSize: 10, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4, display: 'block' };
  const row2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 };

  function Field({ label, val, set, placeholder, type = 'text', full = false }) {
    return (
      <div style={full ? {} : {}}>
        <label style={labelStyle}>{label}</label>
        <input value={val} onChange={e => set(e.target.value)} placeholder={placeholder || label}
          type={type} style={iStyle} />
      </div>
    );
  }

  function SectionHeader({ icon, title, subtitle }) {
    return (
      <div style={{ background: `linear-gradient(135deg, ${T.blue}22, ${T.cyan}11)`, border: `1px solid ${T.cyan}33`, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${T.cyan}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon n={icon} size={20} color={T.cyan} />
          </div>
          <div>
            <div style={{ fontFamily: F.family, fontSize: 15, fontWeight: 800, color: T.white }}>{title}</div>
            <div style={{ fontFamily: F.family, fontSize: 11, color: T.muted }}>{subtitle}</div>
          </div>
        </div>
      </div>
    );
  }

  const steps = ['Pengirim', 'Penerima', 'Bayaran'];

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onSubmit && onSubmit(); }, 1500);
  }

  const negeriList = ['Selangor','Kuala Lumpur','Putrajaya','Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Terengganu'];
  const saizList = ['Small','Medium','Large','XL','XXL'];
  const lokasiList = ['Shah Alam','Klang','Subang Jaya','Petaling Jaya','Kuala Lumpur','Putrajaya','Cyberjaya','Ampang','Cheras','Puchong'];
  const bayaranList = ['Cash On Delivery (COD)','Bayar Dahulu / Prepaid','Credit Card','Bank Transfer','E-Wallet'];
  const negaraList = ['MALAYSIA','INDONESIA','SINGAPORE','THAILAND','BRUNEI'];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.navyDark }}>
      <AppHeader title="Buat Order" subtitle="Create New Delivery Order" onBack={onBack} />

      {/* Step tabs */}
      <div style={{ display: 'flex', background: T.navyMid, borderBottom: `1px solid ${T.navyBorder}` }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{ flex: 1, padding: '10px 4px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: `2px solid ${step === i ? T.cyan : 'transparent'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: step >= i ? (step === i ? T.cyan : `${T.cyan}44`) : T.navyBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.family, fontSize: 11, fontWeight: 800, color: step >= i ? T.navyDark : T.mutedDark }}>
              {step > i ? <Icon n="check" size={12} color={T.navyDark}/> : i + 1}
            </div>
            <div style={{ fontFamily: F.family, fontSize: 10, fontWeight: 700, color: step === i ? T.cyan : T.mutedDark, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s}</div>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* ── STEP 0: PENGIRIM ── */}
        {step === 0 && <>
          <SectionHeader icon="person_pin" title="Maklumat Pengirim" subtitle="Sila isi butiran penghantar" />

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={row2}>
              <Field label="Nama Penuh" val={sNama} set={setSNama} placeholder="Nama Penuh Pengirim" />
              <Field label="Nama Panggilan" val={sPanggilan} set={setSPanggilan} placeholder="Nama Panggilan" />
            </div>
            <div style={row2}>
              <Field label="IC/Passport Number" val={sIC} set={setSIC} placeholder="IC/Passport Number" />
              <Field label="No. Phone" val={sPhone} set={setSPhone} placeholder="No. Phone" type="tel" />
            </div>
            <div style={row2}>
              <Field label="No. Phone 2" val={sPhone2} set={setSPhone2} placeholder="No. Phone 2" type="tel" />
              <Field label="Bandar / City" val={sBandar} set={setSBandar} placeholder="Bandar" />
            </div>
            <div>
              <label style={labelStyle}>Alamat Garis 1 / Address</label>
              <input value={sAlamat} onChange={e => setSAlamat(e.target.value)} placeholder="Alamat Garis 1" style={iStyle} />
            </div>
            <div>
              <label style={labelStyle}>Negeri / State</label>
              <div style={{ position: 'relative' }}>
                <select value={sNegeri} onChange={e => setSNegeri(e.target.value)} style={selStyle}>
                  <option value="">— Pilih Negeri —</option>
                  {negeriList.map(n => <option key={n}>{n}</option>)}
                </select>
                <Icon n="expand_more" size={16} color={T.muted} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
          </Card>

          <SectionHeader icon="inventory_2" title="Maklumat Parcel" subtitle="Berat, saiz dan keterangan" />

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={row2}>
              <Field label="Berat / Weight (kg)" val={berat} set={setBerat} placeholder="0.0" type="number" />
              <Field label="Jumlah Barang" val={jumlah} set={setJumlah} placeholder="0" type="number" />
            </div>
            <div style={row2}>
              <div>
                <label style={labelStyle}>Saiz / Size</label>
                <div style={{ position: 'relative' }}>
                  <select value={saiz} onChange={e => setSaiz(e.target.value)} style={selStyle}>
                    {saizList.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <Icon n="expand_more" size={16} color={T.muted} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Lokasi</label>
                <div style={{ position: 'relative' }}>
                  <select value={lokasi} onChange={e => setLokasi(e.target.value)} style={selStyle}>
                    <option value="">— Pilih Lokasi —</option>
                    {lokasiList.map(l => <option key={l}>{l}</option>)}
                  </select>
                  <Icon n="expand_more" size={16} color={T.muted} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
                </div>
              </div>
            </div>
            <div style={row2}>
              <Field label="Cas Tambahan (RM)" val={casTambah} set={setCasTambah} placeholder="0" type="number" />
              <Field label="Agent Name" val={agent} set={setAgent} placeholder="Agent Name" />
            </div>
            <div>
              <label style={labelStyle}>Keterangan / Remarks</label>
              <textarea value={keterangan} onChange={e => setKeterangan(e.target.value)}
                placeholder="Keterangan isi dalam kotak..."
                style={{ ...iStyle, height: 80, resize: 'none', lineHeight: 1.5 }} />
            </div>
          </Card>

          <button onClick={() => setStep(1)} style={{ width: '100%', padding: '14px', background: `linear-gradient(135deg, ${T.blue}, ${T.cyan})`, border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: F.family, fontSize: 15, fontWeight: 800, color: T.navyDark, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            Seterusnya / Next <Icon n="arrow_forward" size={18} color={T.navyDark}/>
          </button>
        </>}

        {/* ── STEP 1: PENERIMA ── */}
        {step === 1 && <>
          <SectionHeader icon="location_on" title="Maklumat Penerima" subtitle="Sila isi maklumat penerima" />

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={row2}>
              <Field label="Nama Penuh" val={rNama} set={setRNama} placeholder="Nama Penuh Penerima" />
              <Field label="Nama Panggilan" val={rPanggilan} set={setRPanggilan} placeholder="Nama Panggilan" />
            </div>
            <div style={row2}>
              <Field label="KTP/Passport Number" val={rIC} set={setRIC} placeholder="KTP/Passport" />
              <Field label="No. Phone" val={rPhone} set={setRPhone} placeholder="082289112829" type="tel" />
            </div>
            <div style={row2}>
              <Field label="No. Phone 2" val={rPhone2} set={setRPhone2} placeholder="082289112829" type="tel" />
              <Field label="RT / RW" val={rRTRW} set={setRRTRW} placeholder="RT / RW" />
            </div>
            <div>
              <label style={labelStyle}>Alamat / Address</label>
              <input value={rAlamat} onChange={e => setRAlamat(e.target.value)} placeholder="Alamat Penerima" style={iStyle} />
            </div>
            <div style={row2}>
              <Field label="Dusun" val={rDusun} set={setRDusun} placeholder="Dusun" />
              <Field label="Kelurahan" val={rKelurahan} set={setRKelurahan} placeholder="Kelurahan" />
            </div>
            <div style={row2}>
              <Field label="Kecamatan" val={rKecamatan} set={setRKecamatan} placeholder="Kecamatan" />
              <Field label="Kabupaten" val={rKabupaten} set={setRKabupaten} placeholder="Kabupaten" />
            </div>
            <div style={row2}>
              <Field label="Provinsi" val={rProvinsi} set={setRProvinsi} placeholder="Provinsi" />
              <Field label="Postal Code" val={rPostal} set={setRPostal} placeholder="Postal Code" type="number" />
            </div>
            <div>
              <label style={labelStyle}>Negara / Country</label>
              <div style={{ position: 'relative' }}>
                <select value={rNegara} onChange={e => setRNegara(e.target.value)} style={selStyle}>
                  {negaraList.map(n => <option key={n}>{n}</option>)}
                </select>
                <Icon n="expand_more" size={16} color={T.muted} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, padding: '14px', background: T.navyCard, border: `1.5px solid ${T.navyBorder}`, borderRadius: 12, cursor: 'pointer', fontFamily: F.family, fontSize: 14, fontWeight: 700, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon n="arrow_back" size={16} color={T.muted}/> Balik
            </button>
            <button onClick={() => setStep(2)} style={{ flex: 2, padding: '14px', background: `linear-gradient(135deg, ${T.blue}, ${T.cyan})`, border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: F.family, fontSize: 14, fontWeight: 800, color: T.navyDark, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              Seterusnya <Icon n="arrow_forward" size={16} color={T.navyDark}/>
            </button>
          </div>
        </>}

        {/* ── STEP 2: PAYMENT ── */}
        {step === 2 && <>
          <SectionHeader icon="receipt_long" title="Kos & Pembayaran" subtitle="Semak dan hantar order" />

          {/* Order summary */}
          <Card style={{ border: `1px solid ${T.cyan}33` }}>
            <div style={{ fontFamily: F.family, fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Ringkasan / Summary</div>
            {[
              ['Pengirim', sNama || '—', 'person'],
              ['Penerima', rNama || '—', 'location_on'],
              ['Berat', berat ? `${berat} kg` : '—', 'scale'],
              ['Saiz', saiz, 'inventory_2'],
              ['Lokasi', lokasi || '—', 'map'],
            ].map(([label, val, ic], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: `1px solid ${T.navyBorder}` }}>
                <Icon n={ic} size={14} color={T.muted}/>
                <div style={{ flex: 1, fontFamily: F.family, fontSize: 12, color: T.muted }}>{label}</div>
                <div style={{ fontFamily: F.family, fontSize: 12, color: T.white, fontWeight: 600 }}>{val}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: `1px solid ${T.cyan}33` }}>
              <div style={{ fontFamily: F.family, fontSize: 14, fontWeight: 700, color: T.white }}>Jumlah Kos / Total</div>
              <div style={{ fontFamily: F.family, fontSize: 20, fontWeight: 900, color: T.cyan }}>RM {(parseFloat(casTambah)||0).toFixed(2)}</div>
            </div>
          </Card>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={labelStyle}>Kaedah Pembayaran / Payment Method</label>
              <div style={{ position: 'relative' }}>
                <select value={bayaran} onChange={e => setBayaran(e.target.value)} style={selStyle}>
                  <option value="">— Sila pilih Kaedah Pembayaran —</option>
                  {bayaranList.map(b => <option key={b}>{b}</option>)}
                </select>
                <Icon n="expand_more" size={16} color={T.muted} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}/>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Tangkap Gambar / Capture Image</label>
              {!photoTaken ? (
                <button onClick={() => setPhotoTaken(true)} style={{ width: '100%', height: 80, background: T.navyDark, border: `2px dashed ${T.navyBorder}`, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Icon n="add_a_photo" size={22} color={T.muted}/>
                  <span style={{ fontFamily: F.family, fontSize: 13, color: T.muted }}>Ambil gambar parcel</span>
                </button>
              ) : (
                <div style={{ height: 80, background: T.successBg, border: `1.5px solid ${T.success}44`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Icon n="check_circle" size={20} color={T.success}/>
                  <span style={{ fontFamily: F.family, fontSize: 13, color: T.success, fontWeight: 600 }}>Gambar diambil</span>
                  <button onClick={() => setPhotoTaken(false)} style={{ background: 'none', border: 'none', color: T.muted, fontSize: 11, cursor: 'pointer', marginLeft: 8 }}>Semula</button>
                </div>
              )}
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', background: T.navyCard, border: `1.5px solid ${T.navyBorder}`, borderRadius: 12, cursor: 'pointer', fontFamily: F.family, fontSize: 14, fontWeight: 700, color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon n="arrow_back" size={16} color={T.muted}/> Balik
            </button>
            <button onClick={handleSubmit} disabled={submitting} style={{ flex: 2, padding: '14px', background: submitting ? T.mutedDark : `linear-gradient(135deg, ${T.blue}, ${T.cyan})`, border: 'none', borderRadius: 12, cursor: submitting ? 'wait' : 'pointer', fontFamily: F.family, fontSize: 15, fontWeight: 800, color: T.navyDark, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {submitting ? <><Icon n="sync" size={18} color={T.navyDark}/> Menghantar...</> : <><Icon n="send" size={18} color={T.navyDark}/> Hantar / Submit</>}
            </button>
          </div>
        </>}

        <div style={{ height: 10 }} />
      </div>
    </div>
  );
}
