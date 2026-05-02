// 页面切换功能
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// 导航到指定页面
function navigateTo(pageId) {
    // 隐藏所有页面
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新导航链接
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + pageId) {
            link.classList.add('active');
        }
    });
    
    // 更新URL hash
    window.location.hash = pageId;
}

// 为导航链接添加点击事件
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 移除所有导航链接的active类
        navLinks.forEach(item => item.classList.remove('active'));
        // 为当前点击的链接添加active类
        this.classList.add('active');
        
        // 获取目标页面的ID
        const targetPage = this.getAttribute('href').substring(1);
        
        // 隐藏所有页面
        pages.forEach(page => page.classList.remove('active'));
        // 显示目标页面
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    });
});

// 标签切换功能
const tabBtns = document.querySelectorAll('.tab-btn');

// 为标签按钮添加点击事件
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有标签按钮的active类
        const parent = this.parentElement;
        parent.querySelectorAll('.tab-btn').forEach(item => item.classList.remove('active'));
        // 为当前点击的按钮添加active类
        this.classList.add('active');
    });
});

// 平滑滚动
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 当前角色
let currentRole = 'farmer';

// 角色切换功能
function initRoleSwitcher() {
    const roleBtns = document.querySelectorAll('.role-btn');
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            roleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const role = this.getAttribute('data-role');
            switchRole(role);
        });
    });
}

// 切换角色
function switchRole(role) {
    currentRole = role;
    
    // 更新角色显示
    const roleDisplay = document.getElementById('current-role-display');
    if (roleDisplay) {
        roleDisplay.textContent = role === 'farmer' ? '农户' : '设计师';
    }
    
    // 显示/隐藏农户专属元素
    const farmerElements = document.querySelectorAll('.farmer-only');
    farmerElements.forEach(el => {
        if (role === 'farmer') {
            el.style.display = ''; // 恢复默认显示方式
        } else {
            el.style.display = 'none';
        }
    });
    
    // 显示/隐藏设计师专属元素
    const designerElements = document.querySelectorAll('.designer-only');
    designerElements.forEach(el => {
        if (role === 'designer') {
            el.style.display = ''; // 恢复默认显示方式
        } else {
            el.style.display = 'none';
        }
    });
    
    // 更新统计数据
    updateUserStats(role);
    
    console.log('当前角色:', role);
}

// 更新用户统计数据
function updateUserStats(role) {
    const statsContainer = document.getElementById('user-stats-container');
    if (!statsContainer) return;
    
    if (role === 'farmer') {
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span>发布任务</span>
                <strong>3</strong>
            </div>
            <div class="stat-item">
                <span>完成订单</span>
                <strong>2</strong>
            </div>
            <div class="stat-item">
                <span>收藏</span>
                <strong>15</strong>
            </div>
        `;
    } else {
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span>完成订单</span>
                <strong>12</strong>
            </div>
            <div class="stat-item">
                <span>好评率</span>
                <strong>98%</strong>
            </div>
            <div class="stat-item">
                <span>收入</span>
                <strong>¥12,000</strong>
            </div>
        `;
    }
}

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                showSearchResults(query);
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// 显示搜索结果
function showSearchResults(query) {
    // 隐藏所有页面
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示搜索结果页面
    const searchResultsPage = document.getElementById('search-results');
    if (searchResultsPage) {
        searchResultsPage.classList.add('active');
        
        // 更新搜索标题
        const searchQuery = document.getElementById('searchQuery');
        if (searchQuery) {
            searchQuery.textContent = `"${query}"`;
        }
    }
}

// 任务筛选功能
function initTaskFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选任务
            const tasks = document.querySelectorAll('.task-item');
            tasks.forEach(task => {
                if (filter === 'all' || task.getAttribute('data-type') === filter) {
                    task.style.display = 'block';
                } else {
                    task.style.display = 'none';
                }
            });
        });
    });
}

// 排序功能
function initSortSelect() {
    const sortSelect = document.querySelector('.sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            console.log('排序方式:', sortBy);
        });
    }
}

// 打开发布任务模态框
function openPublishModal() {
    const modal = document.getElementById('publishModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// 打开模态框（通用函数）
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 任务详情
function openTaskDetail(taskId) {
    openModal('taskDetailModal');
}

// 案例详情
function openCaseDetail(caseId) {
    openModal('caseDetailModal');
}

// 接单/投标
function openApplyModal(taskId) {
    openModal('applyModal');
}

// 初始化发布需求按钮
function initPublishButtons() {
    const publishBtns = document.querySelectorAll('.publish-btn');
    
    publishBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openPublishModal();
        });
    });
}

// 初始化设计师详情按钮
function initDesignerCards() {
    const designerCards = document.querySelectorAll('.designer-card');
    
    designerCards.forEach(card => {
        card.addEventListener('click', function() {
            const modal = document.getElementById('designerModal');
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
}

// 表单提交
function initPublishForm() {
    const form = document.getElementById('publishForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('需求发布成功！');
            closeModal('publishModal');
            form.reset();
        });
    }
}

// 初始化接单表单
function initApplyForm() {
    const form = document.getElementById('applyForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('投标成功！');
            closeModal('applyModal');
            form.reset();
        });
    }
}

// 初始化编辑资料表单
function initEditProfileForm() {
    const form = document.getElementById('editProfileForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('资料保存成功！');
            closeModal('editProfileModal');
        });
    }
}

// 响应式导航菜单
function toggleMobileMenu() {
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.classList.toggle('mobile-active');
    }
}

// 滚动时导航栏样式变化
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    }
});

// 卡片悬停效果增强
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .case-card, .category-card, .designer-card, .task-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

// 按钮点击效果
function addButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 服务分类点击筛选
function filterTasksByCategory(category) {
    // 切换到任务大厅页面
    pages.forEach(page => page.classList.remove('active'));
    const taskHall = document.getElementById('task-hall');
    if (taskHall) {
        taskHall.classList.add('active');
        
        // 更新导航链接
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#task-hall') {
                link.classList.add('active');
            }
        });
        
        // 根据分类筛选
        const tasks = document.querySelectorAll('.task-item');
        const categoryMap = {
            'logo': 'logo',
            'packaging': 'packaging',
            'slogan': 'slogan',
            'marketing': 'marketing'
        };
        
        const targetType = categoryMap[category];
        
        tasks.forEach(task => {
            if (targetType) {
                if (task.getAttribute('data-type') === targetType) {
                    task.style.display = 'block';
                } else {
                    task.style.display = 'none';
                }
            } else {
                task.style.display = 'block';
            }
        });
    }
}

// 个人中心菜单功能
function showMyTasks() {
    alert('查看我发布的任务');
}

function showInProgress() {
    alert('查看进行中的订单');
}

function showHistory() {
    alert('查看历史订单');
}

function showFavDesigners() {
    alert('查看收藏的设计师');
}

function showFavCases() {
    alert('查看收藏的案例');
}

// 显示投标任务
function showBiddingTasks() {
    alert('查看投标中的任务');
}

// 初始化金额选项
function initAmountOptions() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            const customInput = document.querySelector('#rechargeModal input[type="number"]');
            if (customInput) {
                customInput.value = amount;
            }
        });
    });
}

// 初始化交易标签
function initTransactionTabs() {
    const tabBtns = document.querySelectorAll('.transaction-tabs .tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.getAttribute('data-type');
            console.log('交易类型:', type);
        });
    });
}

// 初始化所有表单
function initAllForms() {
    // 充值表单
    const rechargeForm = document.getElementById('rechargeForm');
    if (rechargeForm) {
        rechargeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('充值成功！');
            closeModal('rechargeModal');
        });
    }
    
    // 提现表单
    const withdrawForm = document.getElementById('withdrawForm');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('提现申请已提交！');
            closeModal('withdrawModal');
        });
    }
    
    // 上传作品表单
    const uploadWorkForm = document.getElementById('uploadWorkForm');
    if (uploadWorkForm) {
        uploadWorkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('作品上传成功！');
            closeModal('uploadWorkModal');
        });
    }
    
    // 实名认证表单
    const verifyForm = document.getElementById('verifyForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('认证申请已提交！');
            closeModal('verifyModal');
        });
    }
    
    // 学生认证表单
    const studentCertForm = document.getElementById('studentCertForm');
    if (studentCertForm) {
        studentCertForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('认证申请已提交！');
            closeModal('studentCertModal');
        });
    }
    
    // 修改密码表单
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('密码修改成功！');
            closeModal('changePasswordModal');
        });
    }
}

// 点击模态框外部关闭
window.addEventListener('click', function(e) {
    // 关闭发布模态框
    const publishModal = document.getElementById('publishModal');
    if (publishModal && e.target === publishModal) {
        closeModal('publishModal');
    }
    
    // 关闭设计师详情模态框
    const designerModal = document.getElementById('designerModal');
    if (designerModal && e.target === designerModal) {
        closeModal('designerModal');
    }
    
    // 关闭通知中心模态框
    const notificationModal = document.getElementById('notificationModal');
    if (notificationModal && e.target === notificationModal) {
        closeModal('notificationModal');
    }
    
    // 关闭任务详情模态框
    const taskDetailModal = document.getElementById('taskDetailModal');
    if (taskDetailModal && e.target === taskDetailModal) {
        closeModal('taskDetailModal');
    }
    
    // 关闭案例详情模态框
    const caseDetailModal = document.getElementById('caseDetailModal');
    if (caseDetailModal && e.target === caseDetailModal) {
        closeModal('caseDetailModal');
    }
    
    // 关闭接单/投标模态框
    const applyModal = document.getElementById('applyModal');
    if (applyModal && e.target === applyModal) {
        closeModal('applyModal');
    }
    
    // 关闭编辑资料模态框
    const editProfileModal = document.getElementById('editProfileModal');
    if (editProfileModal && e.target === editProfileModal) {
        closeModal('editProfileModal');
    }
});

// 任务详情页接单按钮
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('apply-task-btn')) {
        openModal('applyModal');
    }
});

// 评价系统功能
function initReviewSystem() {
    // 初始化星标评分
    initRatingStars();
    
    // 初始化评价标签
    initReviewTags();
    
    // 初始化评价表单
    initReviewForm();
}

function initRatingStars() {
    const ratingContainers = document.querySelectorAll('.rating-stars');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('i');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const value = index + 1;
                container.dataset.rating = value;
                
                // 更新星标显示
                stars.forEach((s, i) => {
                    if (i < value) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // 悬停效果
            star.addEventListener('mouseenter', function() {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // 离开时恢复到选中状态
            star.addEventListener('mouseleave', function() {
                const currentRating = parseInt(container.dataset.rating) || 0;
                stars.forEach((s, i) => {
                    if (i < currentRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    });
}

function initReviewTags() {
    const tags = document.querySelectorAll('.review-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                this.classList.add('selected');
            }
        });
    });
}

function initReviewForm() {
    const form = document.getElementById('reviewForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取评分
            const ratingContainer = form.querySelector('.rating-stars');
            const rating = ratingContainer ? ratingContainer.dataset.rating : 0;
            
            // 获取分类评分
            const categoryRatings = {};
            const categoryContainers = form.querySelectorAll('.rating-stars[data-category]');
            categoryContainers.forEach(container => {
                const category = container.dataset.category;
                categoryRatings[category] = container.dataset.rating;
            });
            
            // 获取选中的标签
            const selectedTags = [];
            const tagElements = form.querySelectorAll('.review-tag.selected');
            tagElements.forEach(tag => {
                selectedTags.push(tag.dataset.tag);
            });
            
            // 获取评价内容
            const contentElement = form.querySelector('textarea');
            const content = contentElement ? contentElement.value : '';
            
            console.log('评价提交:', {
                rating,
                categoryRatings,
                selectedTags,
                content
            });
            
            // 显示成功提示
            alert('评价提交成功!');
            
            // 关闭模态框
            closeModal('reviewModal');
            
            // 重置表单
            resetReviewForm();
        });
    }
}

function resetReviewForm() {
    // 重置星标
    const ratingContainers = document.querySelectorAll('.rating-stars');
    ratingContainers.forEach(container => {
        container.dataset.rating = 0;
        const stars = container.querySelectorAll('i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    });
    
    // 重置标签
    const tags = document.querySelectorAll('.review-tag');
    tags.forEach(tag => {
        tag.classList.remove('selected');
    });
    
    // 重置文本域
    const textarea = document.querySelector('#reviewForm textarea');
    if (textarea) {
        textarea.value = '';
    }
}

// 打开评价模态框
function openReviewModal() {
    openModal('reviewModal');
}

// 打开查看评价详情模态框
function openViewReviewModal() {
    openModal('viewReviewModal');
}

// 设计师数据
const designersData = {
    'designer1': {
        name: '设计师小王',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20designer%20portrait&image_size=square',
        certified: true,
        student: false,
        rating: 4.5,
        tags: ['Logo设计', '包装设计'],
        cases: 12,
        orders: 28,
        price: 2000,
        intro: '资深品牌设计师，10年设计经验，专注农产品品牌打造，擅长将自然元素融入设计。',
        works: [
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=organic%20rice%20packaging%20design&image_size=landscape_4_3', title: '有机大米包装' },
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20fruit%20logo%20design&image_size=landscape_4_3', title: '水果品牌Logo' },
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tea%20package%20design%20elegant&image_size=landscape_4_3', title: '茶叶包装设计' }
        ]
    },
    'designer2': {
        name: '创意小李',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20designer%20portrait&image_size=square',
        certified: true,
        student: false,
        rating: 5.0,
        tags: ['Slogan', '营销策划'],
        cases: 8,
        orders: 15,
        price: 1500,
        intro: '品牌设计行业的创意新星，擅长文字设计打动人。专注农产品品牌设计5年，完成100+项目。',
        works: [
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20product%20marketing%20plan&image_size=landscape_4_3', title: '农产品营销策划' },
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20brand%20slogan%20design&image_size=landscape_4_3', title: '品牌Slogan设计' },
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20fruit%20brand%20logo%20design&image_size=landscape_4_3', title: '水果品牌设计' }
        ]
    },
    'designer3': {
        name: '张设计师',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20designer%20portrait%20professional&image_size=square',
        certified: false,
        student: true,
        rating: 4.0,
        tags: ['包装设计', 'Logo设计'],
        cases: 6,
        orders: 10,
        price: 1200,
        intro: '设计学院高材生，新锐设计师，作品充满创意和活力，擅长年轻态品牌设计。',
        works: [
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fruit%20packaging%20design%20colorful&image_size=landscape_4_3', title: '水果礼盒包装' },
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=grains%20packaging%20design%20traditional%20style&image_size=landscape_4_3', title: '谷物包装设计' },
            { img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=eco%20brand%20logo%20design%20green&image_size=landscape_4_3', title: '生态品牌Logo' }
        ]
    }
};

// 当前选中的设计师
let currentDesigner = null;

// 打开设计师详情模态框
function openDesignerDetail(designerId) {
    currentDesigner = designerId;
    const designer = designersData[designerId];
    
    if (!designer) return;
    
    // 更新模态框内容
    const modal = document.getElementById('designerModal');
    
    // 更新头像
    const avatar = modal.querySelector('.designer-avatar img');
    if (avatar) avatar.src = designer.avatar;
    
    // 更新名字
    const name = modal.querySelector('.designer-info h4');
    if (name) name.textContent = designer.name;
    
    // 更新认证标签
    const certified = modal.querySelector('.designer-info .certified');
    if (certified) {
        if (designer.certified) {
            certified.innerHTML = '<i class="fas fa-check-circle"></i> 认证设计师';
            certified.style.display = 'inline-block';
        } else if (designer.student) {
            certified.innerHTML = '<i class="fas fa-graduation-cap"></i> 高校学生';
            certified.style.display = 'inline-block';
        } else {
            certified.style.display = 'none';
        }
    }
    
    // 更新评分
    const rating = modal.querySelector('.designer-info .rating');
    if (rating) {
        let starsHtml = '';
        const fullStars = Math.floor(designer.rating);
        const hasHalfStar = designer.rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        starsHtml += `<span>${designer.rating}</span>`;
        rating.innerHTML = starsHtml;
    }
    
    // 更新标签
    const tags = modal.querySelector('.designer-info .designer-tags');
    if (tags) {
        tags.innerHTML = designer.tags.map(tag => `<span>${tag}</span>`).join('');
    }
    
    // 更新统计
    const stats = modal.querySelector('.designer-info .designer-stats');
    if (stats) {
        stats.innerHTML = `
            <span><i class="fas fa-briefcase"></i> 案例：${designer.cases}个</span>
            <span><i class="fas fa-trophy"></i> 接单：${designer.orders}次</span>
        `;
    }
    
    // 更新介绍
    const intro = modal.querySelector('.designer-intro p');
    if (intro) intro.textContent = designer.intro;
    
    // 更新作品
    const worksGrid = modal.querySelector('.works-grid');
    if (worksGrid) {
        worksGrid.innerHTML = designer.works.map(work => `
            <div class="work-item">
                <img src="${work.img}" alt="${work.title}">
                <h6>${work.title}</h6>
            </div>
        `).join('');
    }
    
    // 更新价格
    const price = modal.querySelector('.designer-price strong');
    if (price) price.textContent = `¥${designer.price}`;
    
    // 更新联系议价模态框的设计师信息
    const negotiateModal = document.getElementById('negotiateModal');
    const miniAvatar = negotiateModal.querySelector('.designer-mini img');
    const miniName = negotiateModal.querySelector('.designer-mini h4');
    const miniCertified = negotiateModal.querySelector('.designer-mini .certified');
    
    if (miniAvatar) miniAvatar.src = designer.avatar;
    if (miniName) miniName.textContent = designer.name;
    if (miniCertified) {
        if (designer.certified) {
            miniCertified.innerHTML = '<i class="fas fa-check-circle"></i> 认证设计师';
        } else if (designer.student) {
            miniCertified.innerHTML = '<i class="fas fa-graduation-cap"></i> 高校学生';
        }
    }
    
    openModal('designerModal');
}

// 初始化联系议价表单
function initNegotiateForm() {
    const form = document.getElementById('negotiateForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const type = document.getElementById('negotiateType').value;
            const budget = document.getElementById('negotiateBudget').value;
            const desc = document.getElementById('negotiateDesc').value;
            
            console.log('议价信息:', {
                designer: currentDesigner,
                type,
                budget,
                desc
            });
            
            alert('消息已发送！设计师会尽快回复您。');
            closeModal('negotiateModal');
            
            // 重置表单
            form.reset();
        });
    }
}

// 页面加载完成后执行所有初始化函数
document.addEventListener('DOMContentLoaded', function() {
    smoothScroll();
    addCardHoverEffects();
    addButtonEffects();
    initRoleSwitcher();
    initSearch();
    initTaskFilters();
    initSortSelect();
    initPublishButtons();
    initDesignerCards();
    initPublishForm();
    initApplyForm();
    initEditProfileForm();
    initReviewSystem();
    initNegotiateForm();
    
    // 初始化页面
    const hash = window.location.hash.substring(1) || 'home';
    const targetPage = document.getElementById(hash);
    if (targetPage) {
        pages.forEach(page => page.classList.remove('active'));
        targetPage.classList.add('active');
        
        // 更新导航链接
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + hash) {
                link.classList.add('active');
            }
        });
    }
});
