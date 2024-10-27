<script setup lang="ts">
import { ref } from 'vue';
import MenuList from '@/layout/MenuList.vue';
import Icon from '@/components/Icon.vue';

const imgUrl = ref(`https://res.hc-cdn.com/tiny-vue-web-doc/3.18.9.20240902190525/static/images/ld.png`);
</script>

<template>
    <div class="layout">
        <div class="side">
            <div class="logo">
                <div class="logo-box">
                    <Icon iconName="icon-logo" class="logo-icon" />
                    <span class="logo-text">YiSho助手</span>
                </div>
            </div>
            <div class="menu">
                <MenuList />
            </div>
            <div class="footer">
                <div class="avatar">
                    <tiny-user-head v-model="imgUrl" type="image" round min />
                </div>
                <span class="user-name">爱飞的鱼</span>
            </div>
        </div>
        <div class="content">
            <div class="history"></div>
            <div class="main"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    background: rgb(29, 33, 41);

    // 侧边栏
    .side {
        height: 100vh;
        width: 200px;

        // logo
        .logo {
            height: 60px;
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .logo-box {
                display: flex;
                align-items: center;
                // logo图标
                .logo-icon {
                    width: 48px;
                    height: 48px;
                }

                // logo文字
                .logo-text {
                    padding-left: 10px;
                    font-size: 14px;
                    color: #fff;
                }
            }
        }

        // 菜单
        .menu {
            height: 400px;
        }

        // 底部
        .footer {
            position: absolute;
            bottom: 20px;
            width: 180px;
            height: 64px;
            margin-left: 10px;
            display: flex;
            justify-content: left;
            align-items: center;
            border-radius: 10px;
            box-shadow: 0 20px 24px 0 rgba(0, 0, 0, 0.5);
            background: rgb(35, 38, 39);

            .avatar {
                padding-left: 10px;
            }

            .user-name {
                color: white;
                padding-left: 10px;
            }
        }
    }

    // 内容区
    .content {
        margin: 30px 10px;
        height: calc(100vh - 60px);
        flex: 1;
        background: rgb(254, 254, 254);
        border-radius: 20px;
    }
}
</style>
