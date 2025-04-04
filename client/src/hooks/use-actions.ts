import { useCallback } from 'react';
import { useToast } from './use-toast';
import {
  downloadReport as downloadReportAction,
  submitReport as submitReportAction,
  shareContent as shareContentAction,
  exportData as exportDataAction,
  applyFilters as applyFiltersAction,
  registerUser as registerUserAction,
  saveData as saveDataAction
} from '@/lib/actions';

export function useActions() {
  const { toast } = useToast();

  // Download report
  const downloadReport = useCallback((reportType: string, region?: string, format: string = 'pdf') => {
    toast({
      title: 'Downloading Report',
      description: `Preparing ${reportType} report${region ? ` for ${region}` : ''}...`,
      duration: 2000,
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: 'Download Complete',
        description: `${reportType} report has been downloaded successfully.`,
        duration: 3000,
      });
    }, 1500);
  }, [toast]);

  // Submit report or feedback
  const submitReport = useCallback((reportType: string, data: any) => {
    toast({
      title: 'Submitting Report',
      description: 'Your report is being submitted...',
      duration: 2000,
    });
    
    // Simulate submission process
    setTimeout(() => {
      toast({
        title: 'Report Submitted',
        description: 'Your report has been submitted successfully. Thank you!',
        duration: 3000,
      });
    }, 1500);
    
    return true;
  }, [toast]);

  // Share content
  const shareContent = useCallback((title: string, url: string = window.location.href) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      })
        .then(() => {
          toast({
            title: 'Shared Successfully',
            description: 'Content has been shared successfully.',
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          // Fallback to clipboard copy if sharing fails
          copyToClipboard(url);
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(url);
    }
  }, [toast]);

  // Helper function for clipboard copy
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: 'Link Copied',
          description: 'The link has been copied to your clipboard.',
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: 'Copy Failed',
          description: 'Unable to copy the link. Please try again.',
          variant: 'destructive',
          duration: 3000,
        });
      });
  }, [toast]);

  // Export data
  const exportData = useCallback((dataType: string, format: string = 'csv') => {
    toast({
      title: 'Exporting Data',
      description: `Preparing ${dataType} data in ${format.toUpperCase()} format...`,
      duration: 2000,
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: `${dataType} data has been exported successfully as ${format.toUpperCase()}.`,
        duration: 3000,
      });
    }, 1500);
  }, [toast]);

  // Apply filters
  const applyFilters = useCallback((filterName: string, value: any, callback?: (value: any) => void) => {
    toast({
      title: 'Filters Applied',
      description: `${filterName} filter has been updated.`,
      duration: 2000,
    });
    
    if (callback) {
      callback(value);
    }
  }, [toast]);

  // Register user
  const registerUser = useCallback(async (userData: any) => {
    toast({
      title: 'Registration In Progress',
      description: 'Creating your account...',
      duration: 2000,
    });
    
    // Simulate registration process
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: 'Registration Successful',
          description: 'Your account has been created successfully.',
          duration: 3000,
        });
        resolve(true);
      }, 1500);
    });
  }, [toast]);

  // Save data
  const saveData = useCallback((dataType: string, data: any) => {
    toast({
      title: 'Saving Data',
      description: `Saving your ${dataType}...`,
      duration: 2000,
    });
    
    // Simulate saving process
    setTimeout(() => {
      toast({
        title: 'Data Saved',
        description: `Your ${dataType} has been saved successfully.`,
        duration: 3000,
      });
    }, 1500);
    
    return true;
  }, [toast]);

  return {
    downloadReport,
    submitReport,
    shareContent,
    exportData,
    applyFilters,
    registerUser,
    saveData,
    copyToClipboard
  };
}