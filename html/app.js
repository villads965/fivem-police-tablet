const tablet = document.getElementById('tablet');
const navButtons = document.querySelectorAll('.nav');
const panels = document.querySelectorAll('.panel');

function setPanel(name) {
  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.panel === name);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === name);
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => setPanel(button.dataset.panel));
});

document.getElementById('closeTablet').addEventListener('click', () => {
  fetch(`https://${GetParentResourceName()}/closeTablet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({})
  });
});

document.getElementById('issueFineBtn').addEventListener('click', () => {
  const name = document.getElementById('fineName').value.trim();
  const amount = Number(document.getElementById('fineAmount').value);

  if (!name || !amount) {
    return;
  }

  fetch(`https://${GetParentResourceName()}/issueFine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      name,
      amount
    })
  });

  document.getElementById('fineName').value = '';
  document.getElementById('fineAmount').value = '';
});

function renderIncidents(data) {
  const container = document.getElementById('incidentList');
  container.innerHTML = '';

  data.forEach((incident) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div>
        <h4>${incident.title}</h4>
        <p>${incident.location} • ${incident.status}</p>
      </div>
      <span class="badge ${incident.priority === 'High' ? 'warning' : ''}">${incident.priority}</span>
    `;
    container.appendChild(item);
  });
}

function renderFines(data) {
  const container = document.getElementById('fineList');
  container.innerHTML = '';

  data.forEach((fine) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div>
        <h4>${fine.name}</h4>
      </div>
      <span class="badge">$${fine.amount}</span>
    `;
    container.appendChild(item);
  });
}

function renderFleet(data) {
  const container = document.getElementById('fleetList');
  container.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'list-item';
    row.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${item.type} • ${item.zone}</p>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="badge">${item.status}</span>
        <button class="fleet-btn" data-id="${item.id}" data-status="On patrol">Set patrol</button>
      </div>
    `;
    const button = row.querySelector('button');
    button.addEventListener('click', () => {
      fetch(`https://${GetParentResourceName()}/setFleetStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: button.dataset.id,
          status: button.dataset.status
        })
      });
    });
    container.appendChild(row);
  });
}

function applyData(data) {
  if (!data) return;

  document.getElementById('callsCount').textContent = data.stats.calls;
  document.getElementById('arrestsCount').textContent = data.stats.arrests;
  document.getElementById('ticketsCount').textContent = data.stats.tickets;
  document.getElementById('boatsCount').textContent = data.stats.boats;

  document.getElementById('officerName').textContent = data.player.name;
  document.getElementById('officerName2').textContent = data.player.name;
  document.getElementById('officerId').textContent = data.player.id;

  renderIncidents(data.incidents);
  renderFines(data.fines);
  renderFleet(data.fleet);
}

window.addEventListener('message', (event) => {
  const item = event.data;

  if (item.type === 'toggle') {
    tablet.classList.toggle('hidden', !item.open);
    if (item.open) {
      applyData(item.data);
    }
  }

  if (item.type === 'updateData') {
    applyData(item.data);
  }

  if (item.type === 'toast') {
    const old = document.getElementById('toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = item.message;
    toast.style.position = 'fixed';
    toast.style.right = '30px';
    toast.style.bottom = '30px';
    toast.style.background = 'rgba(15, 23, 42, 0.9)';
    toast.style.border = '1px solid rgba(96, 165, 250, 0.5)';
    toast.style.borderRadius = '10px';
    toast.style.padding = '12px 16px';
    toast.style.color = '#fff';
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2200);
  }
});

setPanel('dashboard');
