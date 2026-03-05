// scripts/main.js

// ===== 加载界面 =====
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('loading-overlay');
  const loadingBar = document.getElementById('loading-bar');
  const loadingPercent = document.getElementById('loading-percent');
  const mainContent = document.querySelector('.main-content');
  
  mainContent.style.opacity = '0';
  
  let progress = 0;
  const interval = setInterval(function() {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(function() {
        overlay.style.animation = 'fadeOut 0.8s forwards';
        mainContent.style.opacity = '1';
        startBackgroundMusic();
      }, 500);
    }
    
    loadingBar.style.width = progress + '%';
    loadingPercent.textContent = progress + '%';
  }, 200);
  
  function startBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    if (audio) {
      console.log('音乐准备就绪');
    }
  }
});

// ===== 登录/注册系统 =====
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有元素
  const authChoice = document.getElementById('authChoice');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const mushroomContent = document.getElementById('mushroomContent');
  
  const showLoginBtn = document.getElementById('showLoginBtn');
  const showRegisterBtn = document.getElementById('showRegisterBtn');
  const backFromLogin = document.getElementById('backFromLogin');
  const backFromRegister = document.getElementById('backFromRegister');
  
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const registerSubmitBtn = document.getElementById('registerSubmitBtn');
  
  const loginUsername = document.getElementById('loginUsername');
  const registerUsername = document.getElementById('registerUsername');
  const loginMessage = document.getElementById('loginMessage');
  const registerMessage = document.getElementById('registerMessage');
  
  const displayUsername = document.getElementById('displayUsername');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // 检查是否已注册
  let registeredUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
  let currentUser = localStorage.getItem('current_user');
  
  // 如果已有登录状态，直接显示蘑菇内容
  if (currentUser) {
    showMushroomContent(currentUser);
  }
  
  // 显示登录表单
  showLoginBtn.addEventListener('click', function() {
    authChoice.style.display = 'none';
    loginForm.style.display = 'block';
    loginMessage.innerHTML = '';
    loginUsername.value = '';
  });
  
  // 显示注册表单
  showRegisterBtn.addEventListener('click', function() {
    authChoice.style.display = 'none';
    registerForm.style.display = 'block';
    registerMessage.innerHTML = '';
    registerUsername.value = '';
  });
  
  // 从登录返回
  backFromLogin.addEventListener('click', function() {
    loginForm.style.display = 'none';
    authChoice.style.display = 'block';
  });
  
  // 从注册返回
  backFromRegister.addEventListener('click', function() {
    registerForm.style.display = 'none';
    authChoice.style.display = 'block';
  });
  
  // 登录提交
  loginSubmitBtn.addEventListener('click', function() {
    const username = loginUsername.value.trim();
    
    if (username === '') {
      loginMessage.innerHTML = '请输入名字~';
      loginMessage.style.color = '#8B0000';
      return;
    }
    
    // 检查是否注册过
    if (registeredUsers.includes(username)) {
      // 登录成功
      currentUser = username;
      localStorage.setItem('current_user', username);
      showMushroomContent(username);
    } else {
      // 未注册
      loginMessage.innerHTML = '请先注册！';
      loginMessage.style.color = '#8B0000';
    }
  });
  
  // 注册提交
  registerSubmitBtn.addEventListener('click', function() {
    const username = registerUsername.value.trim();
    
    if (username === '') {
      registerMessage.innerHTML = '请输入名字~';
      registerMessage.style.color = '#8B0000';
      return;
    }
    
    // 检查是否已经注册过
    if (registeredUsers.includes(username)) {
      // 已经注册过，显示温馨提醒
      registerMessage.innerHTML = `${username}，你难道忘了我吗？<br>没关系，我还记得你。`;
      registerMessage.style.color = '#2E8B57';
      
      // 2秒后自动登录
      setTimeout(() => {
        currentUser = username;
        localStorage.setItem('current_user', username);
        showMushroomContent(username);
      }, 2000);
    } else {
      // 新注册
      registeredUsers.push(username);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      
      registerMessage.innerHTML = `欢迎你，${username}！`;
      registerMessage.style.color = '#2E8B57';
      
      // 1秒后自动登录
      setTimeout(() => {
        currentUser = username;
        localStorage.setItem('current_user', username);
        showMushroomContent(username);
      }, 1000);
    }
  });
  
  // 退出登录
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('current_user');
    currentUser = null;
    
    // 返回选择界面
    mushroomContent.style.display = 'none';
    authChoice.style.display = 'block';
  });
  
  // 显示蘑菇小镇内容
  function showMushroomContent(username) {
    authChoice.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    mushroomContent.style.display = 'block';
    displayUsername.textContent = username;
  }
});

// ===== 故障闪过效果 =====
function createGlitch() {
  const container = document.getElementById('glitchContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  const glitchType = Math.floor(Math.random() * 5);
  
  switch(glitchType) {
    case 0:
      for(let i = 0; i < 3; i++) {
        const flash = document.createElement('div');
        flash.className = 'glitch-flash';
        flash.style.top = Math.random() * 100 + '%';
        flash.style.animationDelay = (i * 0.1) + 's';
        container.appendChild(flash);
      }
      break;
    case 1:
      for(let i = 0; i < 3; i++) {
        const flash = document.createElement('div');
        flash.className = 'glitch-flash-vertical';
        flash.style.left = Math.random() * 100 + '%';
        flash.style.animationDelay = (i * 0.1) + 's';
        container.appendChild(flash);
      }
      break;
    case 2:
      for(let i = 0; i < 5; i++) {
        const block = document.createElement('div');
        block.className = 'glitch-block';
        block.style.top = Math.random() * 80 + '%';
        block.style.left = Math.random() * 80 + '%';
        block.style.width = (100 + Math.random() * 200) + 'px';
        block.style.height = (50 + Math.random() * 100) + 'px';
        block.style.background = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.1)`;
        block.style.animationDelay = (i * 0.05) + 's';
        container.appendChild(block);
      }
      break;
    case 3:
      const pixel = document.createElement('div');
      pixel.className = 'pixel-glitch';
      container.appendChild(pixel);
      
      const title = document.querySelector('.glowing-title');
      if(title) {
        title.style.animation = 'textGlitch 0.3s';
        setTimeout(() => {
          title.style.animation = '';
        }, 300);
      }
      break;
    case 4:
      document.body.style.backgroundColor = 'rgba(255,0,255,0.1)';
      document.body.style.transition = 'background-color 0.1s';
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 100);
      
      for(let i = 0; i < 8; i++) {
        setTimeout(() => {
          const flash = document.createElement('div');
          flash.className = 'glitch-flash';
          flash.style.top = Math.random() * 100 + '%';
          flash.style.animation = 'glitchFlash 0.15s ease-out forwards';
          container.appendChild(flash);
        }, i * 30);
      }
      break;
  }
  
  setTimeout(() => {
    container.innerHTML = '';
  }, 1000);
}

function randomGlitch() {
  const interval = 2000 + Math.random() * 6000;
  
  setTimeout(() => {
    createGlitch();
    randomGlitch();
  }, interval);
}

document.addEventListener('DOMContentLoaded', () => {
  randomGlitch();
});

let lastGlitchTime = 0;
document.addEventListener('mousemove', () => {
  const now = Date.now();
  if(now - lastGlitchTime > 1000 && Math.random() < 0.01) {
    lastGlitchTime = now;
    createGlitch();
  }
});

document.addEventListener('click', () => {
  for(let i = 0; i < 3; i++) {
    setTimeout(() => createGlitch(), i * 100);
  }
});

// ===== 背景音乐控制 =====
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  
  if (audio && musicBtn) {
    audio.volume = 0.5;
    
    const playOnFirstClick = function() {
      audio.play().then(() => {
        musicBtn.innerHTML = '🔊 音乐';
        musicBtn.classList.remove('muted');
        console.log('🎵 蘑菇音乐开始播放');
      }).catch(e => {
        console.log('播放失败:', e);
        musicBtn.innerHTML = '⚠️ 点击播放';
      });
      document.removeEventListener('click', playOnFirstClick);
    };
    document.addEventListener('click', playOnFirstClick, { once: true });
    
    musicBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (audio.paused) {
        audio.play();
        musicBtn.innerHTML = '🔊 音乐';
        musicBtn.classList.remove('muted');
      } else {
        audio.pause();
        musicBtn.innerHTML = '🔇 静音';
        musicBtn.classList.add('muted');
      }
    });
    
    audio.addEventListener('ended', function() {
      console.log('🔄 音乐重新开始循环');
    });
  }
});