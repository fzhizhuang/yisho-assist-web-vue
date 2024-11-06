<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { VueCropper } from 'vue-cropper'
import { ref, reactive } from 'vue'
import { IconUpload } from '@arco-design/web-vue/es/icon'
import { Message } from '@arco-design/web-vue'
import { uploadAvatar } from '@/api/user'

// 定义props
defineProps({
  title: String
})

const userStore = useUserStore()
const { showCropper } = storeToRefs(userStore)
const show = ref(true)
const cropper = ref({})
// cropper配置项
const options = reactive({
  img: '', // 裁剪图片的地址
  autoCropWidth: 200, // 固定宽度
  autoCropHeight: 200, // 固定高度
  outputType: 'png', // 裁剪图片的格式
  autoCrop: true, // 是否开启截图框
  fixedBox: true // 固定截图框大小
})
// 预览图片
const previews = ref({
  img: '',
  url: ''
})

// 上传图片处理
const beforeUpload = (file: File) => {
  if (file.type.indexOf('image/') === -1) {
    Message.error('请上传图片')
    return false
  }
  const isLt2M = file.size / 1024 / 1024
  if (isLt2M > 2) {
    Message.error('上传头像图片大小不能超过 2MB!')
    return false
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  // 设置上传后的图像
  reader.onload = () => {
    options.img = reader.result as string
  }
  return true
}

// 设置预览图片
const realTime = (data: any) => {
  previews.value = data
}

const handleOk = () => {
  options.img = ''
  previews.value.url = ''
  cropper.value.getCropBlob((blob: Blob) => {
    const file = new File([blob], 'avatar.png')
    // 上传图片
    uploadAvatar(file).then((res) => {
      if (res.code === 200) {
        Message.success('上传成功')
        userStore.updateAvatar(res.data)
      } else {
        Message.error(res.message)
      }
    })
  })
  userStore.updateShowCropper(false)
}

const handleCancel = () => {
  options.img = ''
  previews.value.url = ''
  userStore.updateShowCropper(false)
}
</script>

<template>
  <div class="avatar-container">
    <a-modal
      :visible="showCropper"
      :title="title"
      title-align="start"
      width="800px"
      :mask-closable="false"
      :closable="false"
      :ok-text="'上传'"
      :draggable="true"
      :ok-button-props="{ disabled: !previews.url }"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-row>
        <a-col :span="12" style="height: 300px">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :outputType="options.outputType"
            @realTime="realTime"
            v-if="show"
          />
        </a-col>
        <a-col :span="12" style="height: 300px">
          <div class="preview-box">
            <img v-if="previews.url" :src="previews.url" :style="previews.img" alt="" />
            <span v-else></span>
          </div>
        </a-col>
      </a-row>
      <a-row style="margin-top: 12px">
        <a-col :span="12">
          <a-row>
            <a-col :span="8">
              <a-upload :auto-upload="false" :on-before-upload="beforeUpload" :showFileList="false">
                <template #upload-button>
                  <a-button type="primary">
                    <IconUpload />
                    <span style="padding-left: 10px">上传头像</span>
                  </a-button>
                </template>
              </a-upload>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.avatar-container {
  .img-box {
    border-radius: 50%;
    border: 1px solid #ccc;
    width: 10vw;
    height: 10vw;
  }

  .upload-icon {
    width: 32px;
    height: 32px;
  }
}

.preview-box {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #ccc;
  overflow: hidden;
}
</style>
