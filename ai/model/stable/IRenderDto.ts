
export interface IRenderRequest {
    prompt: string;
    seed: number;
    used_random_seed: boolean;
    negative_prompt: string;
    num_outputs: number;
    num_inference_steps: number;
    guidance_scale: number;
    width: number;
    height: number;
    vram_usage_level: string;
    sampler_name: string;
    use_stable_diffusion_model: string;
    clip_skip: boolean;
    use_vae_model: string;
    stream_progress_updates: boolean;
    stream_image_progress: boolean;
    show_only_filtered_image: boolean;
    block_nsfw: boolean;
    output_format: string;
    output_quality: number;
    output_lossless: boolean;
    metadata_output_format: string;
    original_prompt: string;
    active_tags: Array<string>;
    inactive_tags: Array<string>;
    use_face_correction: string;
    use_upscale: string;
    upscale_amount: number;
    use_lora_model: string;
    lora_alpha: number;
    tiling: string;
    session_id: string;
}
export interface IRenderResponse {
    data: string;
    seed: string;
    path_abs: string;
}

export interface IRenderDto extends Partial<IRenderRequest> { }

export interface IRenderDtoResponse {
    task: number;
    queue: number;
    stream: string;
    status: RenderStatus;
}

export enum RenderStatus {
    ONLINE = 'Online'
}