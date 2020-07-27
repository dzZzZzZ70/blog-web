<template>
    <transition name="message-fade">
        <div class="message" :class="typeClass" role="alert" v-show="visible">
            <p class="message-content">
                <v-icon
                    large
                    :color="color"
                    :small='true'
                >
                    {{ icon }}
                </v-icon>
                &nbsp;{{ message }}
            </p>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'message',

    data() {
        return {
            visible: false,
            duration: 2000,
            message: '',
            timer: null,
            closed: false,
            color: "",
            icon: "",
            typeClass: ""
        }
    },

    methods: {
        destoryElement() {
            this.$el.removeEventListener('transitionend', this.destoryElement)
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },

        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close()
                    }
                }, this.duration);
            }
        },

        close() {
            this.closed = true
        }
    },

    mounted() {
        this.startTimer()
    },

    watch: {
        closed: function(val) {
            if (val) {
                this.visible = false
                this.$el.addEventListener('transitionend', this.destoryElement)
            }
        }
    }
}
</script>

<style scoped>
.message {
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    transition: opacity .3s, transform .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
}

.message-success {
    background-color: #F0F9EB;
    border-color: #F0F9EB;
    color: #67C23A;
}

.message-error {
    background-color: #FEF0F0;
    border-color:#FEF0F0;
    color: #F56C6C;
}

.message-warning {
    background-color: #FDF6E6;
    border-color:#FDF6E6;
    color: #E6A23C;
}

.message p {
    margin: 0;
}

.message-content {
    padding: 0;
    font-size: 14px;
    line-height: 1;
}

.message-fade-center,
.message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
}
</style>