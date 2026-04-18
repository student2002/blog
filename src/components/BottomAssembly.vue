<template>
  <footer class="footer-wrapper">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 40L48 45C96 50 192 60 288 57.5C384 55 480 40 576 35C672 30 768 35 864 45C960 55 1056 70 1152 67.5C1248 65 1344 45 1392 35L1440 25V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V40Z" fill="#1a1a2e"/>
      </svg>
    </div>
    <div class="footer-content">
      <div class="maxWidthView">
        <el-row :gutter="40">
          <!-- 关于我 -->
          <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3">
            <div class="footer-section">
              <div class="footer-brand">
                <span class="brand-text">Muffin</span>
                <span class="brand-dot">.</span>
                <span class="brand-sub">Blog</span>
              </div>
              <p class="footer-desc">世界那么大，我想去看看。记录技术成长，分享生活感悟。</p>
              <div class="social-links">
                <a href="https://github.com" target="_blank" class="social-link" title="GitHub">
                  <el-icon><Share /></el-icon>
                </a>
                <a href="mailto:3081016708@qq.com" class="social-link" title="Email">
                  <el-icon><Message /></el-icon>
                </a>
                <a href="https://gitee.com" target="_blank" class="social-link" title="Gitee">
                  <el-icon><Link /></el-icon>
                </a>
              </div>
            </div>
          </el-col>
          
          <!-- 相关链接 -->
          <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3">
            <div class="footer-section">
              <h4 class="footer-title">相关链接</h4>
              <ul class="footer-links">
                <li>
                  <a href="https://beian.miit.gov.cn" target="_blank">
                    <el-icon><Document /></el-icon>
                    <span>皖ICP备2025081195号</span>
                  </a>
                </li>
                <li>
                  <a href="https://gitee.com/martins_coachman/blog-vue3-b.git" target="_blank">
                    <el-icon><StarFilled /></el-icon>
                    <span>博客开源模板</span>
                  </a>
                </li>
              </ul>
            </div>
          </el-col>
          
          <!-- 联系我 -->
          <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3">
            <div class="footer-section">
              <h4 class="footer-title">联系我</h4>
              <ul class="footer-contact">
                <li>
                  <el-icon><Location /></el-icon>
                  <span>地址：地球村</span>
                </li>
                <li>
                  <el-icon><ChatLineSquare /></el-icon>
                  <span>QQ：3081016708</span>
                </li>
                <li>
                  <el-icon><Message /></el-icon>
                  <span>邮箱：3081016708@qq.com</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        
        <!-- 底部版权 -->
        <div class="footer-bottom">
          <p>© {{ currentYear }} Muffin.Blog All Rights Reserved.</p>
          <p class="powered-by">
            Powered by 
            <a href="https://vuejs.org" target="_blank">Vue 3</a> & 
            <a href="https://element-plus.org" target="_blank">Element Plus</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Share, StarFilled, Location, ChatLineSquare, Document, Message, Link } from '@element-plus/icons-vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer-wrapper {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  
  .footer-wave {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    margin-top: -1px;
    
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  
  .footer-content {
    padding: 40px 20px 20px;
    
    .footer-section {
      margin-bottom: 30px;
      
      .footer-brand {
        display: flex;
        align-items: baseline;
        margin-bottom: 16px;
        
        .brand-text {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-dot {
          font-size: 28px;
          font-weight: 700;
          color: #764ba2;
        }
        
        .brand-sub {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 2px;
        }
      }
      
      .footer-desc {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.8;
        margin-bottom: 20px;
      }
      
      .social-links {
        display: flex;
        gap: 12px;
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
          
          &:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            transform: translateY(-3px);
          }
          
          .el-icon {
            font-size: 18px;
          }
        }
      }
      
      .footer-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        position: relative;
        padding-bottom: 10px;
        
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }
      }
      
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          margin-bottom: 12px;
          
          a {
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            transition: all 0.3s ease;
            
            .el-icon {
              font-size: 16px;
            }
            
            &:hover {
              color: #667eea;
              transform: translateX(4px);
            }
          }
        }
      }
      
      .footer-contact {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          
          .el-icon {
            font-size: 16px;
            color: #667eea;
          }
        }
      }
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 20px;
      margin-top: 20px;
      text-align: center;
      
      p {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        margin: 0 0 8px;
      }
      
      .powered-by {
        a {
          color: #667eea;
          transition: color 0.3s;

          &:hover {
            color: #764ba2;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-wrapper {
    .footer-wave {
      height: 40px;
    }
    
    .footer-content {
      padding: 20px 15px;
      
      .footer-section {
        .footer-brand {
          .brand-text, .brand-dot {
            font-size: 24px;
          }
          
          .brand-sub {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
